const { ipcRenderer } = window;

export default {
  async get(key: string) {
    const res = await ipcRenderer.invoke("getStore", key);
    return res;
  },
  async set<T>(key: string, value: T) {
    ipcRenderer.send("setStore", key, value);
  },
};
