import {
  UserOutlined,
  LockOutlined,
  MailFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input, Checkbox } from "antd";
import { CSSProperties, memo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsEmail,
  loginAsPhone,
  checkCode,
  checkQrCode,
  sendCode,
  getQrCode,
  getQrCodeImg,
} from "../../apis/login";
import { updateUserInfo, updateLoginState } from "../../models/slice/user";
import storage from "../../utils/storage";
import useAsyncEffest from "../../hooks/useAsyncEffect";
import { ReduxState, UserInfo } from "src/interface/type";
const Card = memo(
  ({ Slot, style }: { Slot: JSX.Element; style?: CSSProperties }) => {
    return (
      <div
        className="shadow-2xl rounded-lg px-10 absolute"
        style={{
          width: 400,
          height: 500,
          backgroundColor: "#4A4A4A",
          ...style,
        }}
      >
        {Slot}
      </div>
    );
  }
);

const LoginDrawer = ({ isModalVisible, setIsModalVisible }) => {
  const [$account, setAccount] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const loginState = useSelector((state: ReduxState) => state.user.loginState);
  const login = async () => {
    if (select == 0) {
      const res = await loginAsPhone($account, password);
      const { cookie, account, profile } = res;
      const userInfo = {
        userName: account.userName,
        createTime: account.createTime,
        vipType: profile.vipType,
        userId: profile.userId,
        nickname: profile.nickname,
        follows: profile.follows,
        followeds: profile.followeds,
        city: profile.city,
        birthday: profile.birthday,
        avatar: profile.avatarUrl,
      };
      storage.set<string>("cookie", cookie);
      storage.set<UserInfo>("userInfo", userInfo);
      dispatch(updateLoginState(true));
      dispatch(updateUserInfo(userInfo));
    }
  };

  return (
    <Drawer
      closable={false}
      footer={null}
      maskClosable
      visible={isModalVisible}
      onClose={() => {
        setIsModalVisible(false);
      }}
      placement="left"
      size={loginState ? "default" : "large"}
      bodyStyle={{
        padding: 0,
      }}
    >
      {loginState ? (
        <div></div>
      ) : (
        <div
          className="transition-all duration-150"
          style={{
            transform: `translateX(${
              select == 0 ? 0 : select == 1 ? 100 : select == 2 ? 0 : -100
            }px)`,
          }}
        >
          <div
            className="flex relative mx-auto transition-all duration-300"
            style={{
              transform: `
      rotateX(10deg)
      rotateY(${
        select == 0 ? 0 : select == 1 ? 90 : select == 2 ? 180 : -90
      }deg)
      rotateZ(0deg)
      `,
              transformStyle: "preserve-3d",
              width: 400,
              height: 500,
              marginTop: "calc(50vh - 300px)",
            }}
          >
            <Card
              key={1}
              style={{
                transform: "rotateY(-90deg)",
                transformOrigin: "100% 50%",
                left: -400,
              }}
              Slot={
                <>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        setSelect(2);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelect(0);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                  <div className="font-serif text-lg text-center mt-12">
                    LOGIN BY EMAIL
                  </div>
                  <div className="bg-white text-gray-600 rounded-full w-20 h-20 mx-auto text-6xl tl-flex-cc mt-12 mb-12">
                    <MailFilled />
                  </div>
                  <Input
                    className="mb-6"
                    prefix={<UserOutlined />}
                    placeholder="请输入你的邮箱"
                    allowClear
                    value={$account}
                    onChange={(event) => setAccount(event.target.value)}
                  />
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请输入你的密码"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <Checkbox>记住我</Checkbox>
                    <Button type="primary">提交</Button>
                  </div>
                </>
              }
            />
            <Card
              key={0}
              style={{
                transform: "rotateY(0)",
              }}
              Slot={
                <>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        setSelect(1);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelect(3);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                  <div className="font-serif text-lg text-center mt-12">
                    LOGIN BY PHONE
                  </div>
                  <div className="bg-white text-gray-600 rounded-full w-20 h-20 mx-auto text-6xl flex items-end justify-center mt-6 mb-12">
                    <UserOutlined />
                  </div>
                  <Input
                    className="mb-6"
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="请输入你的手机号"
                    allowClear
                    value={$account}
                    onChange={(event) => setAccount(event.target.value)}
                  />
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="请输入你的密码"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <Checkbox>记住我</Checkbox>
                    <Button type="primary" onClick={login}>
                      提交
                    </Button>
                  </div>
                </>
              }
            />
            <Card
              key={3}
              style={{
                transform: "rotateY(90deg)",
                transformOrigin: "0% 50%",
                left: 400,
              }}
              Slot={
                <>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        setSelect(0);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelect(2);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                  <div className="font-serif text-lg text-center mt-12">
                    LOGIN BY CODE
                  </div>
                </>
              }
            />
            <Card
              key={2}
              style={{
                transform:
                  "rotateY(0deg) translateX(400px) translateZ(-400px) rotateY(180deg)",
                transformOrigin: "0% 50%",
              }}
              Slot={
                <>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        setSelect(1);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelect(3);
                      }}
                      type="primary"
                      className="tl-flex-cc mt-4"
                      style={{ display: "flex" }}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                  <div className="font-serif text-lg text-center mt-12">
                    LOGIN BY QRCODE
                  </div>
                </>
              }
            />
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default memo(LoginDrawer, function (prev, next) {
  return prev.isModalVisible == next.isModalVisible;
});
