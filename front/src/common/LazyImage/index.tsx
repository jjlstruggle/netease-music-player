import { ImgHTMLAttributes, LegacyRef, useEffect, useRef } from "react";
import io from "../../utils/image";
import load from "../../assets/img/img-lazyload.gif";
export default function LazyImage(
  props: ImgHTMLAttributes<HTMLImageElement> & { previewSrc?: string }
) {
  const img: LegacyRef<HTMLImageElement> = useRef(null);
  useEffect(() => {
    io.observe(img.current!);
  }, []);
  let $props = {
    src: props.previewSrc || load,
  };
  Object.keys(props).forEach((key) => {
    if (key == "src") {
      $props["data-src"] = props[key];
    } else if (key == "previewSrc") {
      $props["src"] = props[key];
    } else {
      $props[key] = props[key];
    }
  });

  return <img {...$props} ref={img} />;
}
