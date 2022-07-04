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
      className="custom-img w-full h-0"
    >
      <LazyImage previewSrc={imglazeload} src={url} alt="图片加载失败" />
      <div className="play-count absolute top-1 text-white text-base flex items-center">
        <SanJiaoIcon style={{ minWidth: 15, minHeight: 15 }} />
        {handleCount(playCount!)}
      </div>
      <div className="icon tl-flex-cc absolute right-0 bottom-0 rounded-full w-1/5 h-1/5 text-3xl transition-all duration-300 text-blue-400 opacity-0">
        <CaretRightOutlined />
      </div>
    </div>
  );
}
