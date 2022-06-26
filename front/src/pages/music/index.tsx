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
import { getMusicLyric, getSimilarMuisc } from "src/apis/music";
import { Icons } from "src/App";
import { Card } from "antd";

const { Meta } = Card;

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
  const [simi, setSimi] = useState([]);
  const lyricBox: LegacyRef<HTMLDivElement> = useRef(null);
  const indexRef = useRef(0);
  useLayoutEffect(() => {
    imgCtx.setStore(img);
  }, []);
  const musicInfo = useSelector((state: ReduxState) => state.musicInfo.curSong);
  useEffect(() => {
    getMusicLyric(musicInfo.id).then((res) => {
      setLyric(handleLyric(res.lrc.lyric));
    });
    getSimilarMuisc(musicInfo.id).then((res) => {
      console.log(res);
      setSimi(res.songs);
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

      if (index !== indexRef.current) {
        indexRef.current = index;
        setCurIndex(index);
      }
    };

    $audio.addEventListener("timeupdate", $whenTimeUpdate);
    return () => {
      $audio.removeEventListener("timeupdate", $whenTimeUpdate);
    };
  }, [lyric]);

  useEffect(() => {
    if (!lyric) return;
    const oneSliceHeight = lyricBox.current.children[0].clientHeight;
    if (curIndex >= 4) {
      lyricBox.current.scrollTop = oneSliceHeight * (curIndex - 4);
    }
  }, [curIndex]);

  return (
    <div className="tl-music flex flex-1 bg-black flex-col opacity-70 overflow-x-hidden overflow-y-hidden">
      <Header className="header flex items-center w-full justify-between">
        <div></div>
        <div className="flex">
          <Icons />
        </div>
      </Header>
      <div className="flex flex-1 overflow-x-hidden overflow-y-auto">
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
          <div className="lyric-box pb-8 mt-8" ref={lyricBox}>
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
        <div
          className="w-1/2 flex flex-wrap justify-between items-center"
          style={{ padding: "0 64px" }}
        >
          <div className="text-white text-xl font-serif tracking-wide">
            与{musicInfo.name}相似的音乐
          </div>
          {simi.map((song, index) => (
            <Card
              size="small"
              hoverable
              cover={<img alt="example" src={song.album.picUrl} />}
              key={index}
            >
              <Meta title={song.name} description={handleAr(song.artists)} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
