import "./index.scss";
import {
  getBanner,
  getMv,
  getPersonalized,
  getRecommandPlaylist,
} from "../../../apis/discover";
import { useEffect, useState } from "react";
import { RightOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Mv, Personalize, PlaylistInfo } from "../../../interface";
import { Link } from "react-router-dom";
import Image from "../../../common/Image";
import { SanJiaoIcon } from "../../../assets/svg";
import { handleCount } from "../../../utils";
let $cImg = 0;
let timer: any;
const autoplay = (banner: any[], setCImg: Function) => {
  if (banner.length) {
    timer = setInterval(() => {
      if ($cImg === banner.length - 1) {
        $cImg = 0;
      } else {
        $cImg++;
      }
      setCImg($cImg);
    }, 5000);
  }
};

export default function Recommand() {
  const [banner, setBanner] = useState([]);
  const [cImg, setCImg] = useState(0);
  const [recommand, setRecommand] = useState(new Array(10));
  const [personalized, setpersonalized] = useState(new Array(3));
  const [mv, setMv] = useState(new Array(4));
  useEffect(() => {
    getBanner().then((res) => {
      setBanner(res.banners);
    });
    getRecommandPlaylist().then((res) => {
      setRecommand(res.result);
    });
    getPersonalized().then((res) => {
      setpersonalized(res.result);
    });
    getMv().then((res) => {
      setMv(res.result);
    });
  }, []);
  useEffect(() => {
    autoplay(banner, setCImg);
    return () => {
      clearTimeout(timer);
    };
  }, [banner]);
  return (
    <div className="recommand">
      <div
        style={{
          height: 360,
          position: "relative",
        }}
      >
        {banner.map((item: { imageUrl: string }, index) => {
          if (index === cImg) {
            return (
              <img
                src={item.imageUrl}
                style={{
                  height: 300,
                  top: 0,
                  zIndex: 1,
                }}
                className="banner"
                alt="图片加载失败"
                key={index}
              />
            );
          }
          if (
            index === cImg - 1 ||
            (cImg === 0 && index === banner.length - 1)
          ) {
            return (
              <img
                src={item.imageUrl}
                style={{
                  height: 240,
                  top: 30,
                  transform: "translateX(-50%)",
                }}
                className="banner"
                alt="图片加载失败"
                key={index}
              />
            );
          }
          if (
            index === cImg + 1 ||
            (cImg === banner.length - 1 && index === 0)
          ) {
            return (
              <img
                src={item.imageUrl}
                style={{
                  height: 240,
                  top: 30,
                  transform: "translateX(50%)",
                }}
                className="banner"
                alt="图片加载失败"
                key={index}
              />
            );
          }

          return (
            <img
              src={item.imageUrl}
              style={{
                height: 240,
                top: 30,
                opacity: 0,
              }}
              className="banner"
              alt="图片加载失败"
              key={index}
            />
          );
        })}
        <div>
          <ul
            style={{
              height: 60,
              position: "absolute",
              bottom: 0,
              width: "100%",
              margin: 0,
            }}
            className="flex-center-center"
          >
            {banner.map((i, index) => (
              <li
                className={"carousel-dots " + (index === $cImg ? "active" : "")}
                key={index}
                onMouseOver={() => {
                  $cImg = index;
                  setCImg(index);
                  clearInterval(timer);
                }}
                onMouseLeave={() => {
                  autoplay(banner, setCImg);
                }}
              />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="title">
          推荐歌单&nbsp;
          <RightOutlined />
        </div>
        <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
          {recommand.map((playlist: PlaylistInfo, index) => (
            <Col key={index} className="recommand-playlist" span={"4_8"}>
              <Link to={`/home/playlist?pid=${playlist.id}`}>
                <Image
                  url={playlist.picUrl || ""}
                  playCount={playlist.playCount || 0}
                />
                <div children={playlist.name} className="playlist-name" />
              </Link>
            </Col>
          ))}
        </Row>
        <div className="title">
          独家放送&nbsp;
          <RightOutlined />
        </div>
        <Row gutter={[32, 32]} style={{ marginBottom: 30 }}>
          {personalized.map((personalized: Personalize, index) => (
            <Col key={index} className="recommand-personalized" span={8}>
              <Link to={`/mv?mid=${personalized.id}`}>
                <img src={personalized.picUrl} alt="图片加载失败" />
                <div children={personalized.name} className="playlist-name" />
                <div className="icon flex-center-center">
                  <CaretRightOutlined />
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="title">
          推荐mv&nbsp;
          <RightOutlined />
        </div>
        <Row gutter={[32, 32]} style={{ marginBottom: 30 }}>
          {mv.map((item: Mv, index) => (
            <Col key={index} className="recommand-mv" span={6}>
              <Link to={`/mv?mid=${item.id}`}>
                <div className="play-count">
                  <SanJiaoIcon style={{ minWidth: 15, minHeight: 15 }} />
                  {handleCount(item.playCount)}
                </div>
                <img src={item.picUrl} alt="图片加载失败" />
                <div children={item.name} className="playlist-name" />
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
