import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import playlist from "./slice/playlist";
import musicInfo from "./slice/musicInfo";

export default configureStore({
  reducer: combineReducers({ playlist, musicInfo }),
});
