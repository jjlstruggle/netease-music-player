import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
// @ts-ignore
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./models";
import "./apis";
import ImgProvider, { Ctx } from "./context/back";
import OnlineCtx from "./context/online";
import { useContext } from "react";
import storage from "./utils/storage";
import cache from "./utils/cache";
window["$audio"] = new Audio();

const Image = () => {
  const imgCtx = useContext(Ctx);
  return <img src={imgCtx.imgUrl} className="absolute w-full h-full" />;
};

(async () => {
  const res = await storage.getAll();
  console.log(res);
  cache.set("store", res);
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <OnlineCtx>
        <ImgProvider>
          <HashRouter>
            <div className="flex w-full h-full">
              <Image />
              <App />
            </div>
          </HashRouter>
        </ImgProvider>
      </OnlineCtx>
    </Provider>
  );
})();
