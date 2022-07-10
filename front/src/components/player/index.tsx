import { useDispatch, useSelector } from "react-redux";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
  DownloadOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import "./index.less";
import { useState } from "react";
import {
  LoopIcon,
  SuiJiIcon,
  HeartBeatIcon,
  SanJiaoIcon,
} from "../../assets/svg";

import { ReduxState } from "src/interface/type";
import AudioBar from "./AudioBar";
import Volume from "./Volume";
import { handleAr } from "../../utils";

import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import useLazy from "src/hooks/useLazy";

const MusicMenu = useLazy(import("./MusicMenu"));

function Player() {
  const [isPause, setIsPause] = useState(true);
  const curMusic = useSelector((state: ReduxState) => state.musicInfo.curSong);
  const navigation = useNavigate();
  const router = useLocation();

  return (
    <div className="player flex select-none relative">
      <AudioBar setIsPause={setIsPause} />
      <div
        className={
          JSON.stringify(curMusic) === "{}"
            ? "flex w-1/4 h-full items-center invisible"
            : "flex w-1/4 h-full items-center"
        }
        onClick={() => {
          if (router.pathname === "/music") {
            navigation(-1);
          } else {
            navigation("music");
          }
        }}
      >
        <div className="music-pic">
          <img src={curMusic.al ? curMusic.al.picUrl : ""} alt="请尝试刷新" />
        </div>
        <div>
          <div className="text-lg">
            <div className="text-sm mr-2 mb-1">{curMusic.name || ""}</div>
          </div>
          <div className="text-xs">
            {curMusic.ar ? handleAr(curMusic.ar) : ""}
          </div>
        </div>
      </div>
      <div className="power-info">POWERED BY SAGA</div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <HeartOutlined />
      </div>
      <div className="h-full items-center flex text-xl text-white mr-6 ml-6">
        <SuiJiIcon />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <DownloadOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        <BackwardOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        {!isPause ? (
          <PauseOutlined
            onClick={() => {
              window.$audio.src && window.$audio.pause();
            }}
          />
        ) : (
          <SanJiaoIcon
            onClick={() => {
              window.$audio.src && window.$audio.play();
            }}
          />
        )}
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-3">
        <ForwardOutlined />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <Volume />
      </div>
      <MusicMenu />
    </div>
  );
}

export default Player;
