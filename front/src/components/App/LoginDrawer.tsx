import {
  UserOutlined,
  LockOutlined,
  MailFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import { CSSProperties, memo, useState } from "react";

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
  const [account, setAccount] = useState<string | undefined>();
  const [Password, setPassword] = useState<string | undefined>();
  const [select, setSelect] = useState(0);

  return (
    <Drawer
      closable={false}
      footer={null}
      maskClosable
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      placement="left"
      size="large"
      bodyStyle={{
        padding: 0,
      }}
    >
      <div
        className="w-full flex relative mx-auto transition-all duration-300"
        style={{
          transform: `rotateX(10deg) rotateY(${select * 120}deg)`,
          transformStyle: "preserve-3d",
          width: 400,
          height: 500,
          marginTop: "calc(50vh - 250px)",
        }}
      >
        <Card
          key={0}
          style={{
            transform: "rotateY(240deg)",
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
                value={account}
                onChange={(event) => setAccount(event.target.value)}
              />
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
                value={Password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </>
          }
        />
        <Card
          key={1}
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
                value={account}
                onChange={(event) => setAccount(event.target.value)}
              />
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
                value={Password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </>
          }
        />
        <Card
          key={2}
          style={{
            transform: "rotateY(120deg)",
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
                    setSelect(1);
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
    </Drawer>
  );
};

export default LoginDrawer;
