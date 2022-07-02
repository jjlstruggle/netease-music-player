import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import playlist from "./slice/playlist";
import musicInfo from "./slice/musicInfo";
import user from "./slice/user";
export default configureStore({
  reducer: combineReducers({ playlist, musicInfo, user }),
});
