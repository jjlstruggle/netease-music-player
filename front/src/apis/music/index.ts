import $ from "../index";

export const getMusicUrl = async (id: string, br?: number) => {
  let p;
  if (br) {
    p = await $.get(`/song/url?id=${id}&br=${br}`);
  } else {
    p = await $.get(`/song/download/url?id=${id}`);
  }
  return p;
};

export const getMusicDownLoadUrl = async (id: string) => {
  const p = await $.get(`/song/url?id=${id}`);
  return p;
};

export const checkMusic = async (id: number, br?: number) => {
  let p;
  if (br) {
    p = await $.get(`/check/music?id=${id}&br=${br}`);
  } else {
    p = await $.get(`/check/music?id=${id}`);
  }
  return p;
};

export const getMusicLyric = async (id: string) => {
  const p = await $.get(`/lyric?id=${id}`);
  return p;
};

export const getSimilarMuisc = async (id: string) => {
  const p = await $.get(`/simi/song?id=${id}`);
  return p;
};
