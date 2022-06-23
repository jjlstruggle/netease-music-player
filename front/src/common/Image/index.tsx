import "./index.scss";
import imglazeload from "../../assets/img/img-lazyload.gif";
import { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { SanJiaoIcon } from "../../assets/svg";
import { handleCount } from "../../utils";
export default function Image({
  url,
  playCount,
}: {
  url: string;
  playCount?: number;
}) {
  const [load, setLoad] = useState(true);
  return (
    <div
      style={{
        position: "relative",
      }}
      className="custom-img"
    >
      {load ? (
        <div
          className="lazyload-img"
          style={{
            backgroundImage: `url(${imglazeload})`,
          }}
        ></div>
      ) : (
        ""
      )}
      <img
        src={url}
        style={{
          opacity: load ? 0 : 1,
        }}
        alt="图片加载失败"
        onLoad={() => setLoad(false)}
      />
      <div className="play-count">
        <SanJiaoIcon style={{ minWidth: 15, minHeight: 15 }} />
        {handleCount(playCount!)}
      </div>
      <div className="icon flex-center-center">
        <CaretRightOutlined />
      </div>
    </div>
  );
}
