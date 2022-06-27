import Store from "electron-store";

const store = new Store({
  cwd: "cache",
});

export default store;
