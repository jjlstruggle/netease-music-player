import {
  createAction,
  createReducer,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { PlayerState } from "../../interface";

type PlayList = [];
interface CurrentPlayListInfo {}

let initialState: PlayerState = {
  playList: [],
  currentPlayListInfo: {},
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    updatePlayList: (state, action: PayloadAction<PlayList>) => {
      state.playList = action.payload;
    },
    updateCurrentPlayListInfo: (
      state,
      action: PayloadAction<CurrentPlayListInfo>
    ) => {
      state.currentPlayListInfo = action.payload;
    },
  },
});

export default playlistSlice.reducer;
