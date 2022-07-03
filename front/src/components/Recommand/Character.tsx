import { Fragment } from "react";
import { getRecommandPlaylist } from "../../apis/discover";
import { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { PlaylistInfo } from "../../interface";
import { Link } from "react-router-dom";
import Image from "../../common/Image";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import hasNet from "src/utils/net";

const Charactar = () => {
  const [recommand, setRecommand] = useState(new Array(10));
  useAsyncEffect(async () => {
    const cacheFunction = await getRecommandPlaylist();
    const cacheRes = await cacheFunction.getDataFromStorage();
    if (cacheRes) {
      setRecommand(cacheRes.result);
    }
    if (hasNet()) {
      const apiRes = await cacheFunction.getDataFromApi();
      setRecommand(apiRes.result);
    }
  });

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
