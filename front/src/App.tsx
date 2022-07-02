import "./App.less";
import { Layout } from "antd";
import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Player from "./components/player";
import useLazy from "./hooks/useLazy";
import { Ctx } from "./context/back";
import { useDispatch } from "react-redux";
import useAsyncEffect from "./hooks/useAsyncEffect";
import storage from "./utils/storage";
import { updateLoginState, updateUserInfo } from "./models/slice/user";
import Home from "./pages/home";
const LazyMusic = useLazy(import("./pages/music"));
const { Footer } = Layout;

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
  const dispatch = useDispatch();
  useAsyncEffect(async () => {
    const userInfo = await storage.get("userInfo");
    if (userInfo) {
      dispatch(updateLoginState(true));
      dispatch(updateUserInfo(userInfo));
    }
  }, []);
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
