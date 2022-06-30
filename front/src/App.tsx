import "./App.less";
import { Layout, Menu, Input, Divider } from "antd";
import {
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  GithubOutlined,
  SettingOutlined,
  SkinOutlined,
  BoldOutlined,
  MailOutlined,
  PlusOutlined,
  LoginOutlined,
  HistoryOutlined,
  CloudOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useContext, useMemo, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Discover from "./pages/discover";
import { PodcastIcon, MyCollectIcon, YinFuIcon } from "./assets/svg";
import Player from "./components/player";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import useLazy from "./hooks/useLazy";
import { Ctx } from "./context/back";
import useHistory from "./hooks/useHistroy";
import Icons from "./components/App/Icons";
const LazyPlayList = useLazy(import("./pages/playlist/index"));
const LazyMusic = useLazy(import("./pages/music"));
const LazyLogin = useLazy(import("./components/App/LoginDrawer"));
const { Header, Content, Sider, Footer } = Layout;

const Head = () => {
  const { shell } = window;
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: "",
    vipStatus: 0,
  });
  const history = useHistory();

  return (
    <Header className="header flex items-center justify-between select-none ">
      <LazyLogin
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      <div className="flex items-center">
        <Icons />
      </div>
      <div className="flex items-center">
        <div className="text-xl flex items-center ml-5 tl-click">
          <span
            className={
              history.stack.length > 1
                ? "text-blue-500 p-1 bg-slate-200 rounded-full flex justify-center items-center mr-2 cursor-pointer"
                : "text-neutral-50 p-1 bg-slate-200 rounded-full flex justify-center items-center mr-2 cursor-pointer"
            }
            onClick={() => {
              navigate(-1);
            }}
          >
            <LeftOutlined />
          </span>
          <span
            className={
              history.type.at(-1) == "pop"
                ? "text-blue-500 p-1 bg-slate-200 rounded-full flex justify-center items-center mr-2 cursor-pointer"
                : "text-neutral-50 p-1 bg-slate-200 rounded-full flex justify-center items-center mr-2 cursor-pointer"
            }
            onClick={() => {
              if (history.type.at(-1) == "pop") {
                navigate(1);
              }
            }}
          >
            <RightOutlined />
          </span>
        </div>
        <div className="w-80 flex items-center overflow-hidden tl-click">
          <Input.Search placeholder="搜索音乐，视频，歌词，电台" />
        </div>
      </div>
      <div className="settings flex text-white items-center text-xl">
        <div
          className="flex items-center cursor-pointer mx-4 tl-click"
          onClick={() => setIsModalVisible(true)}
        >
          {userInfo.avatar ? (
            <img src={userInfo.avatar} alt="图片加载失败" />
          ) : (
            <UserOutlined />
          )}
        </div>
        <div className="flex mx-8 lg-none tl-click">
          <SkinOutlined />
        </div>
        <div className="flex mx-8 lg-none tl-click">
          <MailOutlined />
        </div>
        <div className="flex mx-8 lg-none tl-click">
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
        <a
          className="flex mx-4 overflow-hidden lg-none tl-click"
          onClick={(e) => {
            e.preventDefault();
            shell.openExternal("https://www.jialestudy.xyz/saga-home");
          }}
        >
          <BoldOutlined />
        </a>
        <a
          className="flex mx-4 overflow-hidden lg-none tl-click"
          onClick={(e) => {
            e.preventDefault();
            shell.openExternal(
              "https://github.com/jjlstruggle/netease-music-player"
            );
          }}
        >
          <GithubOutlined />
        </a>
      </div>
    </Header>
  );
};

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
const Image = () => {
  const imgCtx = useContext(Ctx);
  return (
    <img
      src={imgCtx.imgUrl}
      className="absolute"
      style={{ width: "100vw", height: "100vh", top: "91vh" }}
    />
  );
};

export default function App() {
  return (
    <Layout className="flex-1">
      <Routes>
        <Route path="/home/*" element={<Home />}></Route>
        <Route path="/music" element={<LazyMusic />}></Route>
        <Route path="*" element={<Navigate to="/home/discover/recommand" />} />
      </Routes>
      <Footer className="relative opacity-70 overflow-hidden">
        <Image />
        <Player />
      </Footer>
    </Layout>
  );
}
