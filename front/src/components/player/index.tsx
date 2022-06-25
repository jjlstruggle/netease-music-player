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
import {
  Dispatch,
  Fragment,
  LegacyRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LoopIcon,
  SuiJiIcon,
  HeartBeatIcon,
  SanJiaoIcon,
} from "../../assets/svg";
import { handleAr, parseDt } from "../../utils";
import throttle from "../../utils/throttle";
import { Slider, Tooltip } from "antd";

const Volume = () => {
  return (
    <Fragment>
      <SoundOutlined className="mr-2" />
      <div className="w-24">
        <Slider
          defaultValue={100}
          onChange={(value) => {
            const { $audio } = window;
            $audio.volume = value / 100;
          }}
        />
      </div>
    </Fragment>
  );
};

const AudioBar = ({
  setIsPause,
  setATime,
  setCTime,
}: {
  setIsPause: Dispatch<SetStateAction<boolean>>;
  setATime: Dispatch<SetStateAction<string>>;
  setCTime: Dispatch<SetStateAction<string>>;
}) => {
  const [audioProgress, setAudioProgress] = useState("0%");
  const audioProgressBar: LegacyRef<HTMLDivElement> = useRef(null);
  const formatTitle = () => {
    const { $audio } = window;
    return parseDt($audio.currentTime) + " / " + parseDt($audio.duration);
  };
  useEffect(() => {
    const { $audio } = window;
    const { current: audio } = audioProgressBar;
    const whenPlay = () => {
      setIsPause(false);
      setATime("99:99");
    };
    const whenPause = () => {
      setIsPause(true);
    };
    const whenTimeUpdate = () => {
      setCTime("99:99");
      let rate = (100 * $audio.currentTime) / $audio.duration;
      setAudioProgress(rate + "%");
    };
    const whenMouseMove = throttle((event: MouseEvent) => {
      const { clientX } = event;
      const rate = clientX / audio.clientWidth;
      $audio.currentTime = rate * $audio.duration;
    }, 100);
    const whenMouseDown = () => {
      document.addEventListener("mousemove", whenMouseMove.run);
      document.addEventListener("mouseup", whenMouseUp);
    };
    const whenMouseUp = () => {
      document.removeEventListener("mousemove", whenMouseMove.run);
      document.removeEventListener("mouseup", whenMouseUp);
    };
    const whenClick = (event: MouseEvent) => {
      const { clientX } = event;
      const rate = clientX / audio.clientWidth;
      $audio.currentTime = rate * $audio.duration;
    };
    $audio.addEventListener("play", whenPlay);
    $audio.addEventListener("pause", whenPause);
    $audio.addEventListener("timeupdate", whenTimeUpdate);
    audio.addEventListener("mousedown", whenMouseDown);
    audio.addEventListener("click", whenClick);
    return () => {
      whenMouseMove.cancel();
      $audio.removeEventListener("play", whenPlay);
      $audio.removeEventListener("pause", whenPause);
      $audio.removeEventListener("timeupdate", whenTimeUpdate);
      audio.removeEventListener("mousedown", whenMouseDown);
      audio.removeEventListener("mousedown", whenClick);
      document.removeEventListener("mousemove", whenMouseMove.run);
      document.removeEventListener("mouseup", whenMouseUp);
    };
  }, []);
  return (
    <div className="audioProgressBar" ref={audioProgressBar}>
      <div
        style={{ width: audioProgress }}
        className="audioProgressTrack flex items-center"
      >
        <Tooltip color="red" title={formatTitle}>
          <div
            style={{
              width: 14,
              height: 14,
              backgroundColor: "#141414",
              borderColor: "#153450",
              marginTop: -5,
            }}
            className="absolute right-0 top-0 rounded-full duration-300 border-gray-200 hanlder border-2"
          />
        </Tooltip>
      </div>
    </div>
  );
};
function Player({ currentMusicInfo }: any) {
  const [ctime, setCTime] = useState("00:00");
  const [atime, setATime] = useState("00:00");
  const [isPause, setIsPause] = useState(true);

  return (
    <div className="player flex select-none relative">
      <AudioBar
        setIsPause={setIsPause}
        setATime={setATime}
        setCTime={setCTime}
      />
      <div className="flex w-1/4 h-full items-center">
        <div className="music-pic">
          <img
            src="https://www.mooyuu.com/uploadfile/2021/1011/thumb_1000_0_20211011032316905.png"
            alt="请尝试刷新"
          />
        </div>
        <div>
          <div className="text-lg">
            <div className="text-sm mr-2 mb-1">痛失吾爱，满目破败</div>
          </div>
          <div className="text-xs">佛耶戈</div>
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
      <div className="h-full items-center flex text-xl mr-6 ml-6">
        <MenuOutlined />
      </div>
    </div>
  );
}

export default Player;
