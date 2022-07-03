import $ from "../index";

const loginAsPhone = async (
  phone: string,
  password: string,
  captcha?: string
) => {
  const stamp = new Date().getTime();
  const data = password
    ? {
        password,
        phone,
        timeStamp: stamp,
      }
    : {
        password,
        captcha,
        timeStamp: stamp,
      };
  const res = await $.post("/login/cellphone", data);
  return res.data;
};

const loginAsEmail = async (email: string, password: string) => {
  const stamp = new Date().getTime();
  const res = await $.post(
    "/login",
    {
      email,
      password,
      timeStamp: stamp,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res.data;
};

const getQrCode = async () => {
  const key = await $.defaultGet("/login/qr/key");
  return key.data;
};

const getQrCodeImg = async (key: string) => {
  const img = await $.defaultGet(
    `/login/qr/create?key=${key}&qrimg=${Date.now()}`
  );
  return img.data;
};

const checkQrCode = async (key: string) => {
  const res = await $.defaultGet(`login/qr/check?key=${key}`);
  return res.data;
};

const refreshLogin = async () => {
  const res = await $.defaultGet("/login/refresh");
  return res.data;
};

const sendCode = async (phone: string) => {
  const res = await $.defaultGet(`/captcha/sent?phone=${phone}`);
  return res.data;
};

const checkCode = async (phone: string, captcha: string) => {
  const res = await $.defaultGet(
    `/captcha/sent?phone=${phone}&captcha=${captcha}`
  );
  return res.data;
};

const logout = async () => {
  const res = await $.post("/logout?timestamp=" + new Date().getTime());
  return res.data;
};

const getLoginState = async () => {
  const res = await $.defaultGet("/login/status");
  return res.data;
};

export {
  loginAsEmail,
  loginAsPhone,
  getQrCode,
  getQrCodeImg,
  checkCode,
  checkQrCode,
  sendCode,
  refreshLogin,
  logout,
  getLoginState,
};
