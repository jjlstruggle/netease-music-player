import { getBanner } from "../../apis/discover";
import { useState } from "react";
import { Carousel } from "antd";
import LazyImage from "../../common/LazyImage";
import useAsyncEffect from "src/hooks/useAsyncEffect";
import hasNet from "src/utils/net";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useAsyncEffect(async () => {
    const data = await getBanner();
    setBanner(data.banners);
  });

  return (
    <Carousel
      className="pt-5 tl-slick-box"
      autoplay
      style={{
        position: "relative",
      }}
    >
      {banner.map((item: { imageUrl: string }, index) => {
        return (
          <div className="overflow-hidden rounded-lg h-60" key={index}>
            <LazyImage
              src={item.imageUrl}
              className="h-full w-full"
              alt="图片加载失败"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Banner;
