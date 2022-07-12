import { Fragment } from "react";
import { getPersonalized } from "../../apis/discover";
import { useState } from "react";
import { RightOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Personalize } from "../../interface";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import hasNet from "src/utils/net";

const PersonalizeC = () => {
  const [personalized, setpersonalized] = useState(new Array(3));
  useAsyncEffect(async () => {
    const data = await getPersonalized();
    setpersonalized(data.result);
  });

  return (
    <Fragment>
      <div className="title">
        独家放送&nbsp;
        <RightOutlined />
      </div>
      <Row gutter={[32, 32]} style={{ marginBottom: 30 }}>
        {personalized.map((personalized: Personalize, index) => (
          <Col key={index} className="recommand-personalized relative" span={8}>
            <Link to={`/mv?mid=${personalized.id}`}>
              <img
                src={personalized.picUrl}
                alt="图片加载失败"
                className="w-full rounded-lg h-32"
              />
              <div children={personalized.name} className="playlist-name" />
              <div className="absolute top-0 left-0 translate-x-7 translate-y-2 w-7 h-7 rounded-2xl text-2xl text-blue-400 tl-flex-cc">
                <CaretRightOutlined />
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default PersonalizeC;
