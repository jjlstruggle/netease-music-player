import { useDispatch, useSelector } from "react-redux";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  SoundOutlined,
  MenuOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import "./index.less";
import {
  Dispatch,
  Fragment,
  LegacyRef,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LoopIcon,
  SuiJiIcon,
  HeartBeatIcon,
  SanJiaoIcon,
} from "../../assets/svg";
import { Drawer, Slider, Table, Tooltip } from "antd";
import { ReduxState } from "src/interface/type";
import AudioBar from "./AudioBar";
import Volume from "./Volume";
import { fomate, parseDt, handleAr } from "../../utils";
import type { ColumnsType } from "antd/lib/table";
import { MusicInfo, updateCurrentSongs } from "src/models/slice/musicInfo";
import { getMusicUrl } from "src/apis/music";
import LazyImage from "src/common/LazyImage";

export interface DataType {
  index: JSX.Element;
  name: string;
  playlist: string;
  time: string;
  musician: string;
  key: number;
  info: MusicInfo;
}

const columns: ColumnsType<DataType> = [
  { title: "", dataIndex: "index", align: "center" },
  { title: "音乐标题", dataIndex: "name", align: "center" },
  {
    title: "歌手",
    dataIndex: "musician",
    align: "center",
  },
  {
    title: "专辑",
    dataIndex: "playlist",
    align: "center",
  },
  {
    title: "时间",
    dataIndex: "time",
    align: "center",
  },
];

const MusicMenu = memo(() => {
  const [visible, setVisible] = useState(false);
  const musicList = useSelector(
    (state: ReduxState) => state.musicInfo.songsList
  );
  const dispatch = useDispatch();
  const dataSource = musicList.map((music, index) => ({
    index: (
      <div className="flex-side-center">
        <span>{fomate(index + 1)}</span>
      </div>
    ),
    name: music.name,
    playlist: music.al.name,
    time: parseDt(music.dt / 1000),
    musician: handleAr(music.ar),
    key: index,
    info: music,
  }));

  return (
    <div className="h-full items-center flex text-xl mr-6 ml-6">
      <MenuOutlined onClick={() => setVisible(true)} />
      <Drawer
        visible={visible}
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        size="large"
      >
        <Table
          onRow={(record: { info: MusicInfo }) => {
            return {
              onDoubleClick: async () => {
                const { id } = record.info;
                const musicUrlInfo = await getMusicUrl(id);
                let info = Object.assign({}, record.info, {
                  musicUrlInfo: musicUrlInfo.data[0],
                });
                dispatch(updateCurrentSongs(info));
                window.$audio.src = info.musicUrlInfo.url;
                window.$audio.play();
              },
            };
          }}
          rowClassName="select-none"
          dataSource={dataSource}
          columns={columns}
          pagination={{
            hideOnSinglePage: true,
            showSizeChanger: false,
            position: ["bottomCenter"],
          }}
        />
      </Drawer>
    </div>
  );
});

function Player() {
  const [isPause, setIsPause] = useState(true);
  const curMusic = useSelector((state: ReduxState) => state.musicInfo.curSong);
  console.log(curMusic);

  return (
    <div className="player flex select-none relative">
      <AudioBar setIsPause={setIsPause} />
      <div
        className={
          JSON.stringify(curMusic) === "{}"
            ? "flex w-1/4 h-full items-center invisible"
            : "flex w-1/4 h-full items-center"
        }
      >
        <div className="music-pic">
          <img src={curMusic.al ? curMusic.al.picUrl : ""} alt="请尝试刷新" />
        </div>
        <div>
          <div className="text-lg">
            <div className="text-sm mr-2 mb-1">{curMusic.name || ""}</div>
          </div>
          <div className="text-xs">
            {curMusic.ar ? handleAr(curMusic.ar) : ""}
          </div>
        </div>
      </div>
      <div className="power-info">POWERED BY SAGA</div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <HeartOutlined />
      </div>
      <div className="h-full items-center flex text-xl text-white mr-6 ml-6">
        <SuiJiIcon />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <DownloadOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        <BackwardOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        {!isPause ? (
          <PauseOutlined
            onClick={() => {
              window.$audio.src && window.$audio.pause();
            }}
          />
        ) : (
          <SanJiaoIcon
            onClick={() => {
              window.$audio.src && window.$audio.play();
            }}
          />
        )}
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-3">
        <ForwardOutlined />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <Volume />
      </div>
      <MusicMenu />
    </div>
  );
}

export default Player;
