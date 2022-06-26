import { SoundOutlined } from "@ant-design/icons";
import { Fragment, memo } from "react";

import { Slider } from "antd";

const Volume = () => {
  return (
    <Fragment>
      <SoundOutlined className="mr-2" />
      <div className="w-24">
        <Slider
          defaultValue={100}
          onChange={(value) => {
            const { $audio } = window;
            $audio.volume = value / 100;
          }}
        />
      </div>
    </Fragment>
  );
};

export default memo(Volume);
