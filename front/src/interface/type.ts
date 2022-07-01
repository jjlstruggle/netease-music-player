import { MusicInfo } from "../models/slice/musicInfo";
type curSong = MusicInfo;

export interface ReduxState {
  musicInfo: {
    curSong: curSong;
    musicMode: string;
    songsList: MusicInfo[];
  };
}

export interface UserInfo {
  userName: string;
  createTime: string;
  vipType: number;
  userId: string;
  nickname: string;
  follows: number;
  followeds: number;
  city: number;
  birthday: string;
  avatar: string;
}
