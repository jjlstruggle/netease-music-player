import { Header } from "antd/lib/layout/layout";
import {
  LegacyRef,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Ctx } from "src/context/back";
import "./index.less";
import img from "../../assets/img/bg-l.jpg";
import { useSelector } from "react-redux";
import { ReduxState } from "src/interface/type";
import { handleAr } from "src/utils";
import { getMusicLyric } from "src/apis/music";
import { Icons } from "src/App";

const handleLyric = (lyric) => {
  let musicLyric = [],
    time_arr = [],
    nowTimeArr = [];

  if (lyric == null) {
    return { musicLyric, nowTimeArr };
  }
  for (let i of lyric.split("\n")) {
    let n = i.search(/]/);
    if (i.substring(n + 1) == "") musicLyric.push("···");
    else musicLyric.push(i.substring(n + 1));
    let time = i.substring(1, n);
    time_arr.push(time);
  }
  for (let a of time_arr) {
    let Time =
      parseInt((a.substring(0, 2) * 60) as unknown as string) +
      parseInt(a.substring(3, 5)) +
      parseFloat(a.substring(5, 9));
    nowTimeArr.push(Time);
  }
  nowTimeArr.pop();
  return {
    musicLyric,
    nowTimeArr,
  };
};
export default function Music() {
  const imgCtx = useContext(Ctx);
  const [lyric, setLyric] = useState<any>(null);
  const [curIndex, setCurIndex] = useState(0);
  const lyricBox: LegacyRef<HTMLDivElement> = useRef(null);

  useLayoutEffect(() => {
    imgCtx.setStore(img);
  }, []);
  const musicInfo = useSelector((state: ReduxState) => state.musicInfo.curSong);
  useEffect(() => {
    getMusicLyric(musicInfo.id).then((res) => {
      setLyric(handleLyric(res.lrc.lyric));
    });
  }, []);
  useEffect(() => {
    if (!lyric) return;
    const { $audio } = window;
    const $whenTimeUpdate = () => {
      let index = 0;
      for (; index < lyric.nowTimeArr.length; ) {
        if ($audio.currentTime > lyric.nowTimeArr[index]) {
          index++;
        } else {
          break;
        }
      }
      console.log(index);

      // $index.current = index
      // setCurIndex(index);
    };

    $audio.addEventListener("timeupdate", $whenTimeUpdate);
    return () => {
      $audio.removeEventListener("timeupdate", $whenTimeUpdate);
    };
  }, [lyric]);

  return (
    <div className="tl-music flex flex-1 bg-black flex-col opacity-70 overflow-x-hidden overflow-y-hidden">
      <Header className="header flex items-center w-full justify-between">
        <div></div>
        <div className="flex">
          <Icons />
        </div>
      </Header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 flex flex-col items-center flex-1">
          <div className="flex items-center">
            <img
              src={musicInfo.al.picUrl}
              className="rounded-full w-20 h-20 mr-4"
            />
            <div>
              <div className="text-4xl font-serif">{musicInfo.name}</div>
              <div className="text-lg">{handleAr(musicInfo.ar)}</div>
            </div>
          </div>
          <div className="lyric-box pb-8 pt-8" ref={lyricBox}>
            {lyric &&
              lyric.musicLyric.map((ly: string, index) => (
                <div
                  className={
                    index === curIndex - 1 ? "tl-lyric active" : "tl-lyric"
                  }
                  key={index}
                >
                  {ly}
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
