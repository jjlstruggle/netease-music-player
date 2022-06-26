import { MusicInfo } from "../models/slice/musicInfo";
type curSong = MusicInfo;

export interface ReduxState {
  musicInfo: {
    curSong: curSong;
    musicMode: string;
    songsList: MusicInfo[];
  };
}
