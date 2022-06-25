import { Fragment } from "react";
import { getRecommandPlaylist } from "../../apis/discover";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { PlaylistInfo } from "../../interface";
import { Link } from "react-router-dom";
import Image from "../../common/Image";

const Charactar = () => {
  const [recommand, setRecommand] = useState(new Array(10));
  useEffect(() => {
    getRecommandPlaylist().then((res) => {
      setRecommand(res.result);
    });
  }, []);
  return (
    <Fragment>
      <div className="title">
        推荐歌单&nbsp;
        <RightOutlined />
      </div>
      <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
        {recommand.map((playlist: PlaylistInfo, index) => (
          <Col key={index} className="cursor-pointer" span={"4_8"}>
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
    </Fragment>
  );
};

export default Charactar;
