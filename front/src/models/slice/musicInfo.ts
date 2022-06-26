import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Al {
  id: number;
  name: string;
  pic: number;
  picUrl: string;
  tns: any[];
}
interface Ar {
  id: string;
  name: string;
  tns: any[];
  alias: any[];
}

interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface M {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface L {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}
interface Sq {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface MusicInfo {
  sq: Sq;
  l: L;
  single: number;
  rtype: number;
  mst: number;
  cp: number;
  name: string;
  al: Al;
  alia: any[];
  id: string;
  ar: Ar[];
  publishTime: number;
  mv: number;
  pst: number;
  t: number;
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: true;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  noCopyrightRcmd: null;
  rurl: null;
  dt: number;
  h: H;
  hr: null;
  a: null;
  cd: number;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: [];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  m: M;
}
type SongsList = MusicInfo[];

const initialState = {
  curSong: {},
  songsList: [],
  musicMode: "order",
};

const musicInfoSlice = createSlice({
  name: "musicInfo",
  initialState,
  reducers: {
    updateCurrentSongs: (state, action: PayloadAction<MusicInfo>) => {
      state.curSong = action.payload;
    },
    updateSongsList: (state, action: PayloadAction<SongsList>) => {
      state.songsList = action.payload;
    },
    updateMuiscMode: (state, action: PayloadAction<string>) => {
      state.musicMode = action.payload;
    },
  },
});

export const { updateCurrentSongs, updateSongsList, updateMuiscMode } =
  musicInfoSlice.actions;
export default musicInfoSlice.reducer;
