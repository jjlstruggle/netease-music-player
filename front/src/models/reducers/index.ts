import { combineReducers } from "@reduxjs/toolkit";
import playlist from "../slice/playlist";
import musicInfo from "../slice/musicInfo";
export default combineReducers({ musicInfo, playlist });
