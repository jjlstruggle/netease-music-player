import $ from "../index";

export const getPlaylistDetail = async (pid: string) => {
  const p = await $.get(`/playlist/detail?id=${pid}`, {}, false);
  return p;
};

export const getMusicListInfo = async (ids: string) => {
  const p = await $.get(`/song/detail?ids=${ids}`, {}, false);
  return p;
};

export const getPlaylistComment = async (pid: string, page?: number) => {
  const p = await $.get(
    `/comment/playlist?id=${pid}&offset=${page * 20}`,
    {},
    false
  );
  return p;
};

export const getPlaylistCollect = async (pid: string, page?: number) => {
  const p = await $.get(
    `/playlist/subscribers?id=${pid}&offset=${page * 20}`,
    {},
    false
  );
  return p;
};
