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
    const cacheFunction = await getPersonalized();
    const cacheRes = await cacheFunction.getDataFromStorage();
    if (cacheRes) {
      setpersonalized(cacheRes.result);
    }
    if (hasNet()) {
      const apiRes = await cacheFunction.getDataFromApi();
      setpersonalized(apiRes.result);
    }
  });

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default PersonalizeC;
