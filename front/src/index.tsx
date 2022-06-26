import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
// @ts-ignore
import test from "./assets/audio/test.mp3";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./models";
import "./apis";
import "./renderer";
import ImgProvider, { Ctx } from "./context/back";
import { useContext } from "react";
window["$audio"] = new Audio(test);
const Image = () => {
  const imgCtx = useContext(Ctx);
  return <img src={imgCtx.imgUrl} className="absolute w-full h-full" />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ImgProvider>
      <BrowserRouter>
        <div className="flex w-full h-full">
          <Image />
          <App />
        </div>
      </BrowserRouter>
    </ImgProvider>
  </Provider>
);
