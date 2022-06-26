import { MusicInfo } from "src/models/slice/musicInfo";

export interface PlaylistInfo {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
}

export interface Personalize {
  id: string;
  name: string;
  picUrl: string;
}

export interface Mv {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
}

export interface PlaylistDetailInfo {
  coverImgUrl: string;
  name: string;
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  updateTime: string;
  subscribedCount: number;
  shareCount: number;
  tags: string[];
  trackIds: [];
  playCount: number;
  description: string;
  commentCount: number;
}

export interface PlaylistState {
  songs?: MusicInfo[];
}

export interface PlaylistActions {
  updateSongs?: (songs: MusicInfo[]) => void;
}

export interface ReduxState {
  playlist: PlaylistState;
  player: PlayerState;
}

export interface Ar {
  id: string;
  name: string;
}

interface Quality {
  br: number;
}

export interface Comment {
  beReplied: [];
  content: string;
  liked: boolean;
  likedCount: number;
  time: number;
  user: {
    avatarUrl: string;
    userId: number;
    nickname: string;
  };
}

export type playMode = "order" | "loop" | "listLoop" | "heartBeat" | "suiJi";

export interface PlayerState {
  playList: [];
  currentPlayListInfo: {};
}

export interface PlayerActions {
  updateCurrentMusicInfo?: (
    musicDetailInfo: MusicInfo & { musicUrlInfo: any }
  ) => void;
}
