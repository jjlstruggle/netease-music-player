const { ipcRenderer } = window;

export default {
  async get(key: string) {
    const res = await ipcRenderer.invoke("getStore", key);
    return res;
  },
  async set<T>(key: string, value: T) {
    ipcRenderer.send("setStore", key, value);
  },
  async getAll() {
    const res = await ipcRenderer.invoke("getAllStore");
    return res;
  },
  async setMusic(musicId: string, data: any) {
    ipcRenderer.send("setMusicStore", musicId, data);
  },
  async setPlaylist(playlistId: string, data: any) {
    ipcRenderer.send("setPlaylistStore", playlistId, data);
  },
};
