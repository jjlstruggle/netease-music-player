import { Ar } from "../interface";
import dayjs from "dayjs";

export const handleCount = (count: number): string | number => {
  if (count < 100000) return count;
  else return parseInt((count / 10000) as unknown as string) + "万";
};

export const handleTag = (tags: string[]): string => {
  let $tag = "";
  tags.forEach((tag, index) => {
    $tag = index === tags.length - 1 ? tag : tag + "/";
  });
  return $tag;
};

export const parseTime = (time: string): string => {
  const $ = dayjs(time);
  let _time = "";
  _time = $.year() + "-" + $.month() + "-" + $.date();
  return _time;
};

export const handleAr = (ars: Ar[]): string => {
  let ar = "";
  ars.forEach((_ar, index) => {
    ar += index === ars.length - 1 ? _ar.name : _ar.name + "/";
  });
  return ar;
};

export function fomate(t: number): string {
  return t < 10 ? "0" + t : "" + t;
}

export const parseDt = (time: number): string => {
  let m,
    s,
    _time = parseInt(time as unknown as string);
  if (_time % 60 === 0) {
    return fomate(_time / 60) + ":00";
  } else {
    m = parseInt((_time / 60) as unknown as string);
    s = _time - 60 * m;
    return fomate(m) + ":" + fomate(s);
  }
};
