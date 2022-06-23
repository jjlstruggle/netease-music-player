import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { PlayerState, playMode } from "../../interface";

type A1 = any;

let initialState: PlayerState = {
  musicList: [],
  currentMusicInfo: {},
  playMode: "order",
  songs: [],
};

export const updateMusicList = createAction("UPDATE_MUSIC_LIST");
export const updateCurrentMusicList = createAction("UPDATE_CURRENT_MUSIC_INFO");
export const updateCurrentMusicInfo = createAction("UPDATE_CURRENT_MUSIC_INFO");
export const updateSongs = createAction("UPDATE_SONGS");

const playListReducer = createReducer(initialState, {
  [updateMusicList.type]: (state, action: PayloadAction<A1>) => {
    state.musicList = action.payload;
  },
  [updateCurrentMusicList.type]: (state, action: PayloadAction<A1>) => {
    state.currentMusicInfo = action.payload;
  },
  [updateCurrentMusicInfo.type]: (state, action: PayloadAction<A1>) => {
    state.playMode = action.payload;
  },
  [updateSongs.type]: (state, action: PayloadAction<A1>) => {
    state.songs = action.payload;
  },
});

export default playListReducer;
