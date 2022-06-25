import { getBanner } from "../../apis/discover";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
import LazyImage from "../../common/LazyImage";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    getBanner().then((res) => {
      setBanner(res.banners);
    });
  }, []);
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
