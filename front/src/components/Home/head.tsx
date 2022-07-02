import { Layout, Input, Divider } from "antd";
import {
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  GithubOutlined,
  SettingOutlined,
  SkinOutlined,
  BoldOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHistory from "../../hooks/useHistroy";
import Icons from "../../components/App/Icons";
import { useSelector } from "react-redux";
import { ReduxState } from "../../interface/type";
import isVoidObj from "src/utils/isVoidObj";
import LazyLogin from "../App/LoginDrawer";

const { Header } = Layout;

const User = ({ setIsModalVisible }) => {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    name: "",
  });
  const user = useSelector((state: ReduxState) => state.user.userInfo);
  useLayoutEffect(() => {
    if (!isVoidObj(user)) {
      setUserInfo({ name: user.nickname, avatar: user.avatar });
    }
  }, []);
  console.log(user);

  return (
    <div
      className="flex items-center cursor-pointer mx-4 tl-click"
      onClick={() => setIsModalVisible(true)}
    >
      {userInfo.avatar ? (
        <img
          src={userInfo.avatar}
          alt="图片加载失败"
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <UserOutlined />
      )}
    </div>
  );
};

const Temp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <User setIsModalVisible={setIsModalVisible} />
      <LazyLogin
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

const Head = () => {
  const { shell } = window;
  const navigate = useNavigate();
  const history = useHistory();

  return (
    <Header className="header flex items-center justify-between select-none ">
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
        <Temp />
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

export default Head;
