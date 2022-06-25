import "./index.less";
import imglazeload from "../../assets/img/img-lazyload.gif";
import { CaretRightOutlined } from "@ant-design/icons";
import { SanJiaoIcon } from "../../assets/svg";
import { handleCount } from "../../utils";
import LazyImage from "../LazyImage";
export default function Image({
  url,
  playCount,
}: {
  url: string;
  playCount?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
      className="custom-img"
    >
      <LazyImage previewSrc={imglazeload} src={url} alt="图片加载失败" />
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
