import { getMusicListInfo } from "../../../apis/playlist";
import {
  PlaylistState,
  PlaylistActions,
  PlayerActions,
} from "../../../interface";
import { Table, Input, Space, Button, InputRef } from "antd";
import { useRef, useState, Ref } from "react";
import "./index.less";
import { fomate, handleAr, parseDt } from "../../../utils";

import {
  SearchOutlined,
  HeartOutlined,
  DownloadOutlined,
  SoundFilled,
} from "@ant-design/icons";
import { getMusicDownLoadUrl, getMusicUrl } from "../../../apis/music";
import {
  updateCurrentSongs,
  updateSongsList,
  MusicInfo,
} from "../../../models/slice/musicInfo";
import useLazy from "src/hooks/useLazy";
import { useDispatch } from "react-redux";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import storage from "src/utils/storage";

interface musicIdsObject {
  id: string;
}

function Musiclist({
  musicIds,
}: { musicIds: musicIdsObject[] } & PlaylistState &
  PlaylistActions &
  PlayerActions) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({
    searchText: "",
  });

  const [curIndex, setCurIndex] = useState<number | null>(null);

  const [songs, updateSongs] = useState([] as MusicInfo[]);

  const handleSearch = (selectedKeys: string[], confirm: Function) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
    });
  };

  const handleReset = (clearFilters: Function) => {
    clearFilters();
    setSearch({
      searchText: "",
    });
  };

  const searchInput: Ref<InputRef> = useRef(null);

  const getColumnSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: Function;
      selectedKeys: string[];
      confirm: Function;
      clearFilters: Function;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            if (!e.target.value.length) {
              handleSearch(selectedKeys, confirm);
            }
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: Boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: MusicInfo) =>
      record.name.toLowerCase().includes(value.toLowerCase()) ||
      // @ts-ignore
      record.musician.toLowerCase().includes(value.toLowerCase()) ||
      // @ts-ignore
      record.playlist.toLowerCase().includes(value.toLowerCase()),

    onFilterDropdownVisibleChange: (visible: Boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current!.select(), 100);
      }
    },
    render: (text: string) => {
      const LazyHightLight = useLazy(import("react-highlight-words"));
      return (
        <LazyHightLight
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      );
    },
  });

  const columns = [
    { title: "", dataIndex: "index", width: 150 },
    { title: "音乐标题", dataIndex: "name" },
    {
      title: "歌手",
      dataIndex: "musician",
    },
    {
      title: "专辑",
      dataIndex: "playlist",
    },
    {
      title: "时间",
      dataIndex: "time",
      ...getColumnSearchProps(),
    },
  ];
  useAsyncEffect(async () => {
    let ids = "";
    musicIds.forEach((idObj) => {
      ids += idObj.id + ",";
    });
    const data = await getMusicListInfo(ids.slice(0, ids.length - 1));
    updateSongs(data.songs);
    setLoading(false);
  });

  const data = songs!.map((item, index) => ({
    index: (
      <div className="flex-side-center">
        {curIndex === index ? (
          <div className="text-blue-400">
            <SoundFilled />
          </div>
        ) : (
          <span>{fomate(index + 1)}</span>
        )}
        <HeartOutlined />
        <DownloadOutlined />
      </div>
    ),
    name: item.name,
    playlist: item.al.name,
    time: parseDt(item.dt / 1000),
    musician: handleAr(item.ar),
    key: index,
    info: item,
  }));

  return (
    <Table
      loading={loading}
      onRow={(record: { info: MusicInfo }, index) => {
        return {
          onDoubleClick: async () => {
            let musicUrlInfo;
            setCurIndex(index);
            const { id } = record.info;

            const data = await getMusicUrl(id);
            if (data.data.url) {
              musicUrlInfo = data.data;
            } else {
              const $data = await getMusicDownLoadUrl(id);
              musicUrlInfo = $data.data[0];
            }
            let info = Object.assign({}, record.info, {
              musicUrlInfo,
            });

            dispatch(updateCurrentSongs(info));
            dispatch(updateSongsList(songs));
            window.$audio.src = info.musicUrlInfo.url;
            window.$audio.play();
          },
        };
      }}
      // @ts-ignore
      columns={columns}
      dataSource={data}
      pagination={{
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ["bottomCenter"],
      }}
      rowClassName="select-none"
    />
  );
}

export default Musiclist;
