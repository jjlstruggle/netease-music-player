import "./App.less";
import logo from "./assets/img/logo.png";
import { Layout, Menu, Input, Divider, Modal } from "antd";
import {
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  GithubOutlined,
  SettingOutlined,
  SkinOutlined,
  BoldOutlined,
  MailOutlined,
  CaretDownOutlined,
  PlusOutlined,
  LoginOutlined,
  HistoryOutlined,
  CloudOutlined,
  HeartOutlined,
  MinusOutlined,
  CloseOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./renderer";
import Discover from "./pages/discover";
import { PodcastIcon, MyCollectIcon, YinFuIcon } from "./assets/svg";
import Player from "./components/player";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import useLazy from "./hooks/useLazy";
const LazyPlayList = useLazy(import("./pages/playlist/index"));

const { Header, Content, Sider, Footer } = Layout;

const Home = ({ playlist }: { playlist: string[] }) => {
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
    <Layout className="home flex-1">
      <Sider width={200} className="border-b border-b-slate-300">
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
          className="flex flex-1 overflow-hidden shadow-lg px-6 border-b border-b-slate-300"
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
  );
};

export default function App() {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: "",
    vipStatus: 0,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playlist, setPlaylist] = useState(["我喜欢的音乐"]);

  return (
    <Layout className="flex-1 opacity-80">
      <Header className="header flex items-center justify-between select-none ">
        <div className="flex items-center">
          <div className="logo flex items-center">
            <img
              className="rounded-full w-10 h-10 mr-4"
              src={logo}
              alt="图片加载失败"
            />
            <div className="text-xl text-white font-serif">网易云音乐</div>
          </div>
          <div className="text-xl flex items-center ml-5">
            <span className="text-neutral-50 p-1 bg-slate-200 rounded-full  flex justify-center items-center mr-2 cursor-pointer">
              <LeftOutlined />
            </span>
            <span className="mr-10 text-neutral-50 p-1 bg-slate-200 rounded-full  flex justify-center items-center cursor-pointer">
              <RightOutlined />
            </span>
          </div>
          <div className="w-80 flex items-center overflow-hidden">
            <Input.Search placeholder="搜索音乐，视频，歌词，电台" />
          </div>
        </div>
        <div className="settings flex text-white items-center text-xl">
          <div
            className="flex items-center cursor-pointer mx-4"
            onClick={() => setIsModalVisible(true)}
          >
            {userInfo.avatar ? (
              <img src={userInfo.avatar} alt="图片加载失败" />
            ) : (
              <UserOutlined />
            )}
          </div>
          <div className="name cursor-pointer text-sm flex mx-4">
            <span>{userInfo.name || "未登录"}</span>
            <CaretDownOutlined />
            <span className="lg-none">
              {userInfo.vipStatus === 0 ? "开通vip" : "vip"}
            </span>
          </div>
          <div className="flex mx-4 lg-none">
            <SkinOutlined />
          </div>
          <div className="flex mx-4 lg-none">
            <MailOutlined />
          </div>
          <div className="flex mx-4 lg-none">
            <SettingOutlined />
          </div>
          <Divider
            className="mx-4"
            type="vertical"
            style={{
              borderLeftWidth: 2,
              height: "1.5rem",
            }}
          />
          <div className="flex mx-4 overflow-hidden lg-none">
            <BoldOutlined />
          </div>
          <div className="flex mx-4 overflow-hidden lg-none">
            <GithubOutlined />
          </div>
          <Divider
            className="overflow-hidden mx-4 lg-none lg:mx-0 lg-none"
            type="vertical"
            style={{
              borderLeftWidth: 2,
              height: "1.5rem",
            }}
          />
          <div className="flex mx-4">
            <MinusOutlined id="min" />
          </div>
          <div className="flex mx-4">
            <ExpandAltOutlined id="max" />
          </div>
          <div className="flex mx-4">
            <CloseOutlined id="exit" />
          </div>
        </div>
        <Modal
          centered
          closable
          footer={null}
          maskClosable
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Header>
      <Routes>
        <Route path="/home/*" element={<Home playlist={playlist} />}></Route>
        <Route path="/music"></Route>
        <Route path="*" element={<Navigate to="/home/discover/recommand" />} />
      </Routes>

      <Footer className="relative">
        <div className="absolute w-full h-full top-0 left-0 tl-bg" />
        <Player />
      </Footer>
    </Layout>
  );
}
