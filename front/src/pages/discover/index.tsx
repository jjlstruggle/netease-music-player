import { Tabs } from "antd";
import "./index.scss";
import CustomMade from "./customMade";
import List from "./list";
import Musician from "./musician";
import Playlist from "./playlist";
import Recommand from "./recommand";
import NewMusic from "./newMusic";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

const tabs = ["个性推荐", "专属订制", "歌单", "排行榜", "歌手", "最新音乐"];

const getComponents = (tab: string) => {
  switch (tab) {
    case tabs[0]:
      return <Recommand />;
    case tabs[1]:
      return <CustomMade />;
    case tabs[2]:
      return <Playlist />;
    case tabs[3]:
      return <List />;
    case tabs[4]:
      return <Musician />;
    case tabs[5]:
      return <NewMusic />;
    default:
      break;
  }
};

export default function Discover() {
  useEffect(() => {
    requestAnimationFrame(() => {
      let root = document.querySelector("#content");
      let header = document.querySelector("#tab>.ant-tabs-nav");
      let body: HTMLDivElement = document.querySelector(
        "#tab>.ant-tabs-content-holder"
      )!;
      body!.style.height = root?.clientHeight! - header?.clientHeight! + "px";
    });
  }, []);
  return (
    <div className="discover">
      <Tabs defaultActiveKey="个性推荐" size="large" id="tab">
        {tabs.map((tab, index) => (
          <TabPane tab={tab} key={index}>
            {getComponents(tab)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
