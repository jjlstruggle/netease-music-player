import { getMv } from "../../apis/discover";
import { Fragment, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Mv } from "../../interface";
import { Link } from "react-router-dom";
import { SanJiaoIcon } from "../../assets/svg";
import { handleCount } from "../../utils";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import hasNet from "src/utils/net";
const MvC = () => {
  const [mv, setMv] = useState(new Array(4));
  useAsyncEffect(async () => {
    const data = await getMv();
    setMv(data.result);
  });

  return (
    <Fragment>
      <div className="title">
        推荐mv&nbsp;
        <RightOutlined />
      </div>
      <Row gutter={[32, 32]} style={{ marginBottom: 30 }}>
        {mv.map((item: Mv, index) => (
          <Col key={index} className="recommand-mv relative" span={6}>
            <Link to={`/mv?mid=${item.id}`}>
              <div className="play-count absolute top-1 text-white text-sm flex items-center">
                <SanJiaoIcon style={{ minWidth: 15, minHeight: 15 }} />
                {handleCount(item.playCount)}
              </div>
              <img
                src={item.picUrl}
                alt="图片加载失败"
                className="w-full rounded-lg h-32"
              />
              <div children={item.name} className="playlist-name" />
            </Link>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default MvC;
