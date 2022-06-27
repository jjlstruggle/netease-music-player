import $ from "axios";

export const getPlaylistDetail = async (pid: string) => {
  const p = await $.get(`/playlist/detail?id=${pid}`);
  return p.data;
};

export const getMusicListInfo = async (ids: string) => {
  const p = await $.get(`/song/detail?ids=${ids}`);
  return p.data;
};

export const getPlaylistComment = async (pid: string, page?: number) => {
  const p = await $.get(`/comment/playlist?id=${pid}&offset=${page * 20}`);
  return p.data;
};

export const getPlaylistCollect = async (pid: string, page?: number) => {
  const p = await $.get(`/playlist/subscribers?id=${pid}&offset=${page * 20}`);
  return p.data;
};
