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
  TeamOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { LoopIcon, SuiJiIcon, HeartBeatIcon } from "../../assets/svg";
import { ReduxState } from "../../interface";
import { handleAr, parseDt } from "../../utils";
function Player({ currentMusicInfo }: any) {
  const [ctime, setCTime] = useState("00:00");
  const [atime, setATime] = useState("00:00");
  const [isPause, setIsPause] = useState(true);
  const fake: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const playAllProcess: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const volumeAllProcess: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const playProcess: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const volumeProcess: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  let canMove: boolean;
  useEffect(() => {
    canMove = fake.current!.clientHeight > 160;
    function whenPlay() {
      setIsPause(false);
      setATime(parseDt(currentMusicInfo.dt / 1000));
    }
    function whenPause() {
      setIsPause(true);
    }
    function whenTimeUpdate() {
      //@ts-ignore
      setCTime(parseDt(window.$audio.currentTime));
      //@ts-ignore
      let rate = window.$audio.currentTime / window.$audio.duration;
      playProcess.current!.style.width =
        playAllProcess.current!.clientWidth * rate + "px";
    }
    //@ts-ignore
    window.$audio.addEventListener("play", whenPlay);
    //@ts-ignore
    window.$audio.addEventListener("pause", whenPause);
    //@ts-ignore
    window.$audio.addEventListener("timeupdate", whenTimeUpdate);
    playAllProcess.current!.addEventListener("mousedown", (event) => {
      let rate =
        (event.clientX - playAllProcess.current!.getBoundingClientRect().left) /
        playAllProcess.current!.clientWidth;
      //@ts-ignore

      window.$audio.currentTime = window.$audio.duration * rate;
      document.onmousemove = (event) => {
        let rate =
          (event.clientX -
            playAllProcess.current!.getBoundingClientRect().left) /
          playAllProcess.current!.clientWidth;
        //@ts-ignore
        window.$audio.currentTime = window.$audio.duration * rate;
      };
    });
    playAllProcess.current!.addEventListener("mouseup", () => {
      document.onmousemove = null;
    });
    document.onmouseup = () => {
      if (document.onmousemove) {
        document.onmousemove = null;
      }
    };
    return () => {
      //@ts-ignore
      window.$audio.removeEventListener("pause", whenPause);
      //@ts-ignore
      window.$audio.removeEventListener("play", whenPlay);
      //@ts-ignore
      window.$audio.removeEventListener("timeupdate", whenTimeUpdate);
    };
  }, [currentMusicInfo]);
  return (
    <div className="player flex select-none">
      <div
        style={{
          visibility:
            JSON.stringify(currentMusicInfo) === "{}" ? "hidden" : "unset",
        }}
      >
        <img
          src={currentMusicInfo.al ? currentMusicInfo.al.picUrl : ""}
          alt="请尝试刷新"
        />
        <div>
          <div className="name">
            <div ref={fake}>{currentMusicInfo.name || ""}</div>
            <span style={{ maxWidth: 160 }} className="marquee">
              {currentMusicInfo.name || ""}
            </span>
            <HeartOutlined />
          </div>
          <div>{handleAr(currentMusicInfo.ar || [])}</div>
        </div>
      </div>
      <div className="player-info">
        <div id="controller">
          <div className="play-mode">
            <MenuUnfoldOutlined />
          </div>
          <div className="last-music">
            <StepBackwardOutlined />
          </div>
          <div
            className="play-control"
            onClick={() => {
              //@ts-ignore
              if (window.$audio.src) {
                //@ts-ignore
                if (window.$audio.paused) {
                  //@ts-ignore
                  window.$audio.play();
                } else {
                  //@ts-ignore
                  window.$audio.pause();
                }
                setIsPause(!isPause);
              }
            }}
          >
            {isPause ? <CaretRightOutlined /> : <PauseOutlined />}
          </div>
          <div className="next-music">
            <StepForwardOutlined />
          </div>
          <div className="music-lyric">
            <span>词</span>
          </div>
        </div>
        <div className="player-process">
          <div className="ctime">{ctime}</div>
          <div className="process" ref={playAllProcess}>
            <span ref={playProcess} />
          </div>
          <div className="atime">{atime}</div>
        </div>
      </div>
      <div
        className="player-others"
        style={currentMusicInfo.name ? {} : { visibility: "hidden" }}
      >
        <div id={"toneQuality"}>标准</div>
        <DownloadOutlined />
        <div id="volume">
          <SoundOutlined />
          <div className={"volume-box"}>
            <span className={"volume-process-box"} ref={volumeAllProcess}>
              <span className={"volume-process"} ref={volumeProcess} />
            </span>
          </div>
        </div>
        <TeamOutlined />
        <MenuOutlined />
      </div>
    </div>
  );
}

export default connect((state: ReduxState) => ({
  currentMusicInfo: state.player.currentMusicInfo,
}))(Player);
