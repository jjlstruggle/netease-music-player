import {
  Dispatch,
  LegacyRef,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { parseDt } from "../../../utils";
import throttle from "../../../utils/throttle";
import { Tooltip } from "antd";
const AudioBar = ({
  setIsPause,
}: {
  setIsPause: Dispatch<SetStateAction<boolean>>;
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
    };
    const whenPause = () => {
      setIsPause(true);
    };
    const whenTimeUpdate = () => {
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

export default memo(AudioBar);
