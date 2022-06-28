import {
  UserOutlined,
  LockOutlined,
  MailFilled,
  QrcodeOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input } from "antd";
import { CSSProperties, useState } from "react";

const Card = ({
  Slot,
  style,
}: {
  Slot: JSX.Element;
  style?: CSSProperties;
}) => {
  return (
    <div
      className="shadow-xl rounded-lg px-10"
      style={{
        width: 400,
        height: 500,
        backgroundColor: "rgb(255,255,255,0.1)",
        ...style,
      }}
    >
      {Slot}
    </div>
  );
};

const LoginDrawer = ({ isModalVisible, setIsModalVisible }) => {
  const [account, setAccount] = useState<string | undefined>();
  const [Password, setPassword] = useState<string | undefined>();
  const [select, setSelect] = useState(1);
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
      <div className="w-full h-full flex items-center">
        <Card
          key={0}
          style={{
            transform: "rotateX(30deg) rotateY(60deg) translateY(-45px)",
            width: select == 0 ? 400 : 200,
          }}
          Slot={
            <>
              <div className="flex justify-end">
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
                LOGIN BY EMAIL
              </div>
              <div className="bg-white text-gray-600 rounded-full w-20 h-20 mx-auto text-6xl tl-flex-cc mt-12 mb-24">
                <MailFilled />
              </div>
              <Input
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
            transform: "rotateX(0) rotateY(0) translateY(0)",
            width: select == 1 ? 400 : 200,
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
            transform: "rotateX(330deg) rotateY(60deg) translateY(-45px)",
            width: select == 2 ? 400 : 200,
          }}
          Slot={
            <>
              <div className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    setSelect(1);
                  }}
                  type="primary"
                  className="mt-4"
                >
                  <ArrowLeftOutlined />
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
