import "./index.scss";
import {
  getBanner,
  getMv,
  getPersonalized,
  getRecommandPlaylist,
} from "../../../apis/discover";
import { useEffect, useState } from "react";
import { RightOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Row, Col, Carousel } from "antd";
import { Mv, Personalize, PlaylistInfo } from "../../../interface";
import { Link } from "react-router-dom";
import Image from "../../../common/Image";
import { SanJiaoIcon } from "../../../assets/svg";
import { handleCount } from "../../../utils";

export default function Recommand() {
  const [banner, setBanner] = useState([]);
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

  return (
    <div className="recommand flex flex-col flex-1 px-32 overflow-x-hidden overflow-y-auto">
      <Carousel
        className="pt-5 "
        autoplay
        style={{
          position: "relative",
        }}
      >
        {banner.map((item: { imageUrl: string }, index) => {
          return (
            <div className="overflow-hidden rounded-lg h-60">
              <img
                src={item.imageUrl}
                className="h-full w-full"
                alt="图片加载失败"
                key={index}
              />
            </div>
          );
        })}
      </Carousel>
      <div className="mt-10">
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
