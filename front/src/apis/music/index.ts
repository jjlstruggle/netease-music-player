import $ from "axios";

export const getMusicUrl = async (id: number, br?: number) => {
  let p;
  if (br) {
    p = await $.get(`/song/url?id=${id}&br=${br}`);
  } else {
    p = await $.get(`/song/url?id=${id}`);
  }
  return p.data;
};

export const checkMusic = async (id: number, br?: number) => {
  let p;
  if (br) {
    p = await $.get(`/check/music?id=${id}&br=${br}`);
  } else {
    p = await $.get(`/check/music?id=${id}`);
  }
  return p.data;
};

export const getMusicLyric = async (id: number) => {
  const p = await $.get(`/lyric?id=${id}`);
  return p.data;
};
