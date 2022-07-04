import { getPlaylistDetail } from "../../apis/playlist";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Button, Tabs } from "antd";
import {
  CaretRightOutlined,
  PlusOutlined,
  FolderAddOutlined,
  LogoutOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import "./index.less";
import { PlaylistDetailInfo } from "../../interface";
import { handleCount, handleTag, parseTime } from "../../utils";
import Musiclist from "./musiclist";
import Comment from "./comment";
import useAsyncEffect from "src/hooks/useAsyncEffect";

const { TabPane } = Tabs;
let commendCount = 0;

export default function Playlist() {
  const fake: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const descript: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const history = useLocation();

  const [playlistInfo, setPlaylistInfo] = useState({} as PlaylistDetailInfo);
  const [isFold, setIsFold] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showFold, setShowFold] = useState(false);
  const pid = history.search.split("=")[1];

  const tabs = ["歌曲列表", `评论(${commendCount})`];
  const getComponents = useCallback(
    (tab: string) => {
      switch (tab) {
        case tabs[0]:
          return <Musiclist musicIds={playlistInfo.trackIds} />;
        case tabs[1]:
          return <Comment pid={pid} />;

        default:
          break;
      }
    },
    [pid, playlistInfo]
  );
  useAsyncEffect(async () => {
    const cacheFunc = await getPlaylistDetail(pid);
    const res = await cacheFunc.getDataFromStorage();
    if (res) {
      setPlaylistInfo(res.playlist);
      setLoading(false);
    }
    const data = await cacheFunc.getDataFromApi();
    commendCount = data.playlist.commentCount;
    setPlaylistInfo(data.playlist);
    setLoading(false);
  });
  useEffect(() => {
    if (!loading) {
      if (fake.current!.clientHeight > descript.current!.clientHeight) {
        setShowFold(true);
      }
    }
  }, [loading]);

  if (loading) return <div></div>;

  return (
    <div className="h-full overflow-x-hidden overflow-y-auto w-full">
      <div className={"playlist-top flex px-7 mr-5 w-52 h-52"}>
        <img
          src={playlistInfo.coverImgUrl}
          alt="图片加载失败"
          className="rounded"
        />
        <div>
          <div>
            <div>歌单</div>
            <div>{playlistInfo.name}</div>
          </div>
          <div>
            <img src={playlistInfo.creator.avatarUrl} alt="图片加载失败" />
            <div>{playlistInfo.creator.nickname}</div>
            <span>{parseTime(playlistInfo.updateTime) + "创建"}</span>
          </div>
          <div>
            <Button type={"primary"} shape={"round"}>
              <CaretRightOutlined />
              播放全部
              <PlusOutlined />
            </Button>
            <Button
              type={"primary"}
              shape={"round"}
              icon={<FolderAddOutlined />}
            >
              收藏( {handleCount(playlistInfo.subscribedCount)} )
            </Button>
            <Button
              type={"primary"}
              shape={"round"}
              icon={<LogoutOutlined rotate={-45} />}
            >
              分享( {handleCount(playlistInfo.shareCount)} )
            </Button>
            <Button
              type={"primary"}
              shape={"round"}
              icon={<LogoutOutlined rotate={-90} />}
            >
              下载全部
            </Button>
          </div>
          <div>标签:{handleTag(playlistInfo.tags)}</div>
          <div>
            歌曲:{playlistInfo.trackIds.length}&nbsp;&nbsp;&nbsp;播放:
            {handleCount(playlistInfo.playCount)}
          </div>
          <div>
            <div
              ref={descript}
              style={
                isFold
                  ? {
                      overflow: "hidden",
                    }
                  : {
                      overflow: "auto",
                      textOverflow: "unset",
                      whiteSpace: "normal",
                    }
              }
            >
              简介:{playlistInfo.description}
            </div>
            <div
              style={{
                visibility: showFold ? "unset" : "hidden",
              }}
            >
              {isFold ? (
                <CaretDownOutlined
                  onClick={() => {
                    setIsFold(false);
                  }}
                />
              ) : (
                <CaretUpOutlined
                  onClick={() => {
                    setIsFold(true);
                  }}
                />
              )}
            </div>
          </div>
          <div className="fake" ref={fake}>
            <div>简介:{playlistInfo.description}</div>
          </div>
        </div>
      </div>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="歌曲列表"
        size="large"
        className="tabBox"
      >
        {tabs.map((tab, index) => (
          <TabPane tab={tab} key={index}>
            {getComponents(tab)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
