import { useDispatch, useSelector } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";
import { memo, useState } from "react";
import { Drawer, Table } from "antd";
import { ReduxState } from "../../../interface/type";
import { fomate, parseDt, handleAr } from "../../../utils";
import { MusicInfo, updateCurrentSongs } from "../../../models/slice/musicInfo";
import { getMusicDownLoadUrl, getMusicUrl } from "../../../apis/music";
import type { ColumnsType } from "antd/lib/table";
import storage from "src/utils/storage";

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
                let musicUrlInfo;
                const { id } = record.info;
                const res = await storage.getMusicData(id);
                if (res) {
                  musicUrlInfo = res;
                } else {
                  const data = await getMusicUrl(id);
                  if (data.data.url) {
                    musicUrlInfo = data.data;
                  } else {
                    const $data = await getMusicDownLoadUrl(id);
                    musicUrlInfo = $data.data[0];
                  }
                }
                storage.setMusic(id, musicUrlInfo);
                let info = Object.assign({}, record.info, {
                  musicUrlInfo: musicUrlInfo,
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

export default MusicMenu;
