import $ from "axios";

export const getPlaylistDetail = async (pid: string) => {
  const p = await $.get(`/playlist/detail?id=${pid}`);
  return p.data;
};

export const getMusicListInfo = async (ids: string) => {
  const p = await $.get(`/song/detail?ids=${ids}`);
  return p.data;
};

export const getPlaylistComment = async (pid: string) => {
  const p = await $.get(`/comment/playlist?id=${pid}`);
  return p.data;
};
