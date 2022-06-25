import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicInfo {}
type SongsList = [];

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
