import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./models";
import "./apis";
// @ts-ignore
window["$audio"] = new Audio();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
