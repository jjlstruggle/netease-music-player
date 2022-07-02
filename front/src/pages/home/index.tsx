import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  LoginOutlined,
  HistoryOutlined,
  CloudOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Discover from "../discover";
import { PodcastIcon, MyCollectIcon, YinFuIcon } from "../../assets/svg";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import useLazy from "src/hooks/useLazy";
import Head from "../../components/Home/head";
const LazyPlayList = useLazy(import("../playlist"));
const { Content, Sider } = Layout;

const Home = () => {
  const [playlist, setPlaylist] = useState(["我喜欢的音乐"]);

  const items: ItemType[] = useMemo(
    () => [
      { label: "发现音乐", key: "1" },
      { label: "播客", key: "2" },
      { label: "视频", key: "3" },
      { label: "关注", key: "4" },
      { label: "直播", key: "5" },
      { label: "私人FM", key: "6" },
      {
        label: "我的音乐",
        key: "l2",
        children: [
          {
            label: "本地与下载",
            key: "7",
            icon: <LoginOutlined rotate={90} />,
          },
          { label: "最近播放", key: "8", icon: <HistoryOutlined /> },
          { label: "我的音乐云盘", key: "9", icon: <CloudOutlined /> },
          { label: "我的播客", key: "10", icon: <PodcastIcon /> },
          { label: "我的收藏", key: "11", icon: <MyCollectIcon /> },
        ],
      },
      {
        label: (
          <div className="flex-side-center">
            <div>创建的歌单</div>
            <div className="create">
              <PlusOutlined />
            </div>
          </div>
        ),
        key: "l3",
        children: playlist.map((item: string, index): any => {
          const $item = {
            label: item,
            key: index,
            icon: index === 0 ? <HeartOutlined /> : <YinFuIcon />,
          };
          return $item;
        }),
      },
    ],
    [playlist]
  );
  return (
    <div className="flex flex-1 flex-col overflow-auto opacity-80">
      <Head />
      <Layout className="home flex-1">
        <Sider width={200} className="select-none">
          <Menu
            style={{ fontSize: 16 }}
            className="h-full overflow-x-hidden overflow-y-auto "
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            id="content"
            className="flex flex-1 overflow-hidden shadow-lg px-6"
          >
            <Routes>
              <Route path="/discover/*" element={<Discover />}></Route>
              <Route path="/podcast"></Route>
              <Route path="/video"></Route>
              <Route path="/focus"></Route>
              <Route path="/live"></Route>
              <Route path="/privateFm"></Route>
              <Route path="/playlist" element={<LazyPlayList />}></Route>
              <Route
                path="*"
                element={<Navigate to="/home/discover/recommand" />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
