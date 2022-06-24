import { getMusicListInfo } from "../../../apis/playlist";
import {
  PlaylistState,
  PlaylistActions,
  ReduxState,
  MusicInfo,
  PlayerActions,
} from "../../../interface";
import { Table, Input, Space, Button, InputRef } from "antd";
import { useEffect, useRef, useState, Ref } from "react";
import { connect } from "react-redux";
import "./index.less";
import { fomate, handleAr, parseDt } from "../../../utils";

import {
  SearchOutlined,
  HeartOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { getMusicUrl } from "../../../apis/music";
import {
  updateSongs as $updateSongs,
  updateCurrentMusicInfo as $updateCurrentMusicInfo,
} from "../../../models/reducers/player";
import useLazy from "src/hooks/useLazy";

const LazyHightLight = useLazy(import("react-highlight-words"));

interface musicIdsObject {
  id: string;
}

function Musiclist({
  musicIds,
  songs,
  updateSongs,
  updateCurrentMusicInfo,
}: { musicIds: musicIdsObject[] } & PlaylistState &
  PlaylistActions &
  PlayerActions) {
  const [search, setSearch] = useState({
    searchText: "",
  });

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
    render: (text: string) => (
      <LazyHightLight
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[search.searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ),
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

  const [tableHeight, setTableHeight] = useState(0);
  useEffect(() => {
    let ids = "";
    musicIds.forEach((idObj) => {
      ids += idObj.id + ",";
    });
    getMusicListInfo(ids.slice(0, ids.length - 1)).then((res) => {
      updateSongs!(res.songs);
    });
    let content = document.querySelector("#content")?.clientHeight!;
    let head =
      document.querySelector(".playlist-top")?.clientHeight! +
      document.querySelector(".playlist .ant-tabs-nav")?.clientHeight! +
      document.querySelector(".table .ant-table-header")?.clientHeight! +
      20;
    setTableHeight(content - head);
  }, []);
  const data = songs!.map((item, index) => ({
    index: (
      <div className="flex-side-center">
        <span>{fomate(index + 1)}</span>
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
      onRow={(record: { info: MusicInfo }) => {
        return {
          onDoubleClick: async () => {
            const { id } = record.info;
            const musicUrlInfo = await getMusicUrl(id);
            let info = Object.assign({}, record.info, {
              musicUrlInfo: musicUrlInfo.data[0],
            });
            updateCurrentMusicInfo!(info);
            // @ts-ignore
            window.$audio.src = info.musicUrlInfo.url;
            // @ts-ignore
            window.$audio.play();
          },
        };
      }}
      className="table"
      // @ts-ignore
      columns={columns}
      // @ts-ignore
      dataSource={data}
      pagination={false}
      scroll={{ y: tableHeight }}
    />
  );
}

export default connect(
  (state: ReduxState) => {
    return {
      songs: state.player.songs,
    };
  },
  (dispatch) => ({
    // @ts-ignore
    updateSongs: (songs: MusicInfo[]) => dispatch($updateSongs(songs)),
    updateCurrentMusicInfo: (
      currentMusicInfo: MusicInfo & {
        musicUrlInfo: {
          url: string;
        };
      }
      // @ts-ignore
    ) => dispatch($updateCurrentMusicInfo(currentMusicInfo)),
  })
)(Musiclist);
