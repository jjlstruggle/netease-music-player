import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
// @ts-ignore
import test from "./assets/audio/test.mp3";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./models";
import "./apis";
window["$audio"] = new Audio(test);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="w-full h-full overflow-hidden flex" id="page-background">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </div>
);
