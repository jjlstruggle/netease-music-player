import {
  MinusOutlined,
  CloseOutlined,
  ExpandOutlined,
  CompressOutlined,
} from "@ant-design/icons";
import { useLayoutEffect, useState } from "react";

const Icons = () => {
  const { ipcRenderer } = window;
  const [isMax, setIsMax] = useState(false);
  useLayoutEffect(() => {
    ipcRenderer.invoke("windowIsMaximized").then((res) => {
      setIsMax(res);
    });
  }, []);
  return (
    <>
      <div
        style={{ backgroundColor: "rgb(255,95,87)" }}
        className="flex text-transparent mx-2 rounded-full p-1 cursor-pointer tl-click hover:text-white transition-colors duration-200"
        onClick={() => {
          ipcRenderer.send("close");
        }}
      >
        <CloseOutlined />
      </div>
      <div
        style={{ backgroundColor: "rgb(255,198,46)" }}
        className="flex mx-2 rounded-full p-1 cursor-pointer tl-click text-transparent hover:text-white transition-colors duration-200"
        onClick={() => {
          ipcRenderer.send("min");
        }}
      >
        <MinusOutlined />
      </div>
      <div
        style={{ backgroundColor: "rgb(40,201,64)" }}
        className="flex text-transparent mx-2 rounded-full p-1 cursor-pointer tl-click hover:text-white transition-colors duration-200"
        onClick={async () => {
          const res = await ipcRenderer.invoke("windowIsMaximized");
          setIsMax(res);
          ipcRenderer.send("max");
        }}
      >
        {isMax ? <CompressOutlined /> : <ExpandOutlined />}
      </div>
    </>
  );
};

export default Icons;
