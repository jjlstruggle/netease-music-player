import $ from "axios";

export const getMusicUrl = async (id: string, br?: number) => {
  let p;
  if (br) {
    p = await $.get(`/song/url?id=${id}&br=${br}`);
  } else {
    p = await $.get(`/song/download/url?id=${id}`);
  }
  if (!p.data.data.url) {
    p = await $.get(`/song/url?id=${id}`);
    return {
      data: p.data.data[0],
    };
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

export const getMusicLyric = async (id: string) => {
  const p = await $.get(`/lyric?id=${id}`);
  return p.data;
};
