import "./App.scss";
import logo from "./assets/img/logo.png";
import { Layout, Menu, Input, Divider, Modal } from "antd";
import {
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  GithubOutlined,
  SettingOutlined,
  SkinOutlined,
  BoldOutlined,
  MailOutlined,
  CaretDownOutlined,
  AudioOutlined,
  PlusOutlined,
  LoginOutlined,
  HistoryOutlined,
  CloudOutlined,
  HeartOutlined,
  CaretUpOutlined,
  MinusOutlined,
  CloseOutlined,
  ExpandAltOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./renderer";
import Discover from "./pages/discover";
import { PodcastIcon, MyCollectIcon, YinFuIcon } from "./assets/svg";
import Player from "./components/player";
import Playlist from "./pages/playlist";
const { Item, ItemGroup } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export default function App() {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: "",
    vipStatus: 0,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFold, setIsFold] = useState(false);
  const [playlist, setPlaylist] = useState(["我喜欢的音乐"]);

  const Home = (
    <Layout style={{ flex: 1 }} className="home">
      <Sider width={200}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          style={{
            height: "100%",
          }}
        >
          <ItemGroup key="g1" title="">
            <Item key="1">发现音乐</Item>
            <Item key="2">播客</Item>
            <Item key="3">视频</Item>
            <Item key="4">关注</Item>
            <Item key="5">直播</Item>
            <Item key="6">私人FM</Item>
          </ItemGroup>
          <ItemGroup key="g2" title="我的音乐">
            <Item key="7" icon={<LoginOutlined rotate={90} />}>
              本地与下载
            </Item>
            <Item key="8" icon={<HistoryOutlined />}>
              最近播放
            </Item>
            <Item key="9" icon={<CloudOutlined />}>
              我的音乐云盘
            </Item>
            <Item key="10" icon={<PodcastIcon />}>
              我的播客
            </Item>
            <Item key="11" icon={<MyCollectIcon />}>
              我的收藏
            </Item>
          </ItemGroup>
          <ItemGroup
            key="g3"
            title={
              <div className="flex-side-center">
                <div>
                  创建的歌单
                  <CaretUpOutlined
                    style={{
                      marginLeft: 8,
                    }}
                    rotate={isFold ? 0 : 180}
                    onClick={() => setIsFold(!isFold)}
                  />
                </div>

                <div className="create">
                  <PlusOutlined />
                </div>
              </div>
            }
          >
            {!isFold
              ? playlist.map((playlsitName, index) => (
                  <Item
                    icon={index === 0 ? <HeartOutlined /> : <YinFuIcon />}
                    key={12 + index}
                  >
                    {playlsitName}
                  </Item>
                ))
              : ""}
          </ItemGroup>
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: "0 24px 0 24px",
        }}
      >
        <Content id="content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/discover" element={<Discover />}></Route>
            <Route path="/podcast"></Route>
            <Route path="/video"></Route>
            <Route path="/focus"></Route>
            <Route path="/live"></Route>
            <Route path="/privateFm"></Route>
            <Route path="/playlist" element={<Playlist />}></Route>
            <Route path="*" element={<Navigate to="/home/discover" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header
        className="header"
        style={{
          backgroundColor: "#69c0ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            backgroundColor: "#69c0ff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img src={logo} alt="图片加载失败" />
            <div>网易云音乐</div>
          </div>
          <div className="go">
            <LeftOutlined />
            <RightOutlined />
          </div>
          <Input
            suffix={<SearchOutlined />}
            className="search"
            placeholder="搜索音乐，视频，歌词，电台"
          />
          <div className="go">
            <AudioOutlined />
          </div>
        </div>
        <div className="settings">
          <div
            className="avatar pointer"
            onClick={() => setIsModalVisible(true)}
          >
            {userInfo.avatar ? (
              <img src={userInfo.avatar} alt="图片加载失败" />
            ) : (
              <UserOutlined />
            )}
          </div>
          <div className="name pointer">
            <span>{userInfo.name || "未登录"}</span>
            <CaretDownOutlined />
            <span>{userInfo.vipStatus === 0 ? "开通vip" : "vip"}</span>
          </div>
          <div>
            <SkinOutlined />
          </div>
          <div>
            <MailOutlined />
          </div>
          <div>
            <SettingOutlined />
          </div>
          <Divider
            type="vertical"
            style={{
              borderLeftWidth: 2,
              height: "1.5rem",
            }}
          />
          <div>
            <BoldOutlined />
          </div>
          <div>
            <GithubOutlined />
          </div>
          <Divider
            type="vertical"
            style={{
              borderLeftWidth: 2,
              height: "1.5rem",
            }}
          />
          <div>
            <MinusOutlined id="min" />
          </div>
          <div>
            <ExpandAltOutlined id="max" />
          </div>
          <div>
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
        <Route path="/home/*" element={Home}></Route>
        <Route path="/music"></Route>
        <Route path="*" element={<Navigate to="/home/" />} />
      </Routes>
      <Footer>
        <Player />
      </Footer>
    </Layout>
  );
}
