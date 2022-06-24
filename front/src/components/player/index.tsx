import { connect } from "react-redux";
import {
  HeartOutlined,
  RetweetOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
  MenuUnfoldOutlined,
  DownloadOutlined,
  SoundOutlined,
  MenuOutlined,
  BackwardOutlined,
  ForwardOutlined,
} from "@ant-design/icons";
import "./index.less";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LoopIcon, SuiJiIcon, HeartBeatIcon } from "../../assets/svg";
import { ReduxState } from "../../interface";
import { handleAr, parseDt } from "../../utils";
function Player({ currentMusicInfo }: any) {
  const [ctime, setCTime] = useState("00:00");
  const [atime, setATime] = useState("00:00");
  const [isPause, setIsPause] = useState(true);
  const playAllProcess: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const volumeAllProcess: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const playProcess: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const volumeProcess: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  let canMove: boolean;
  useEffect(() => {
    function whenPlay() {
      setIsPause(false);
      setATime(parseDt(currentMusicInfo.dt / 1000));
    }
    function whenPause() {
      setIsPause(true);
    }
    function whenTimeUpdate() {
      setCTime(parseDt(window.$audio.currentTime));

      let rate = window.$audio.currentTime / window.$audio.duration;
      playProcess.current!.style.width =
        playAllProcess.current!.clientWidth * rate + "px";
    }

    window.$audio.addEventListener("play", whenPlay);

    window.$audio.addEventListener("pause", whenPause);

    window.$audio.addEventListener("timeupdate", whenTimeUpdate);

    return () => {
      window.$audio.removeEventListener("pause", whenPause);

      window.$audio.removeEventListener("play", whenPlay);

      window.$audio.removeEventListener("timeupdate", whenTimeUpdate);
    };
  }, [currentMusicInfo]);
  return (
    <div className="player flex select-none relative">
      <div>
        <img
          src="https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
          alt="请尝试刷新"
        />
        <div>
          <div className="text-lg">
            <div className="text-sm mr-2 mb-1">痛失吾爱，满目破败</div>
          </div>
          <div className="text-xs">佛耶戈</div>
        </div>
      </div>
      <div className="power-info">POWERED BY SAGA</div>
      <div className="h-full items-center flex text-xl mr-8 ml-8">
        <HeartOutlined />
      </div>
      <div className="h-full items-center flex text-xl text-white mr-6 ml-6">
        <SuiJiIcon />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        <BackwardOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        <PauseOutlined />
      </div>
      <div className="h-full items-center flex text-3xl mr-5 ml-5">
        <ForwardOutlined />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <DownloadOutlined />
      </div>
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <SoundOutlined />
      </div>

      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <MenuOutlined />
      </div>
    </div>
  );
}

export default connect((state: ReduxState) => ({
  currentMusicInfo: state.player.currentMusicInfo,
}))(Player);
