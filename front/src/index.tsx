import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./models";
import "./apis";
window["$audio"] = new Audio();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
