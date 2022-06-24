import { Tabs } from "antd";
import "./index.less";
import { useCallback, useEffect, useState } from "react";
import useLazy from "src/hooks/useLazy";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const tabs = ["个性推荐", "专属订制", "歌单", "排行榜", "歌手", "最新音乐"];
const paths = [
  "/recommand",
  "/customMade",
  "/playlist",
  "/list",
  "/musician",
  "/newMusic",
];

export default function Discover() {
  const NewMusic = useLazy(import("./newMusic"));
  const Recommand = useLazy(import("./recommand"));
  const Playlist = useLazy(import("./playlist"));
  const Musician = useLazy(import("./musician"));
  const List = useLazy(import("./list"));
  const CustomMade = useLazy(import("./customMade"));
  const navigate = useNavigate();
  return (
    <div className="discover overflow-hidden relative flex flex-col">
      <Tabs
        defaultActiveKey="个性推荐"
        size="large"
        id="tab"
        onChange={(key) => {
          navigate("/home/discover" + paths[key]);
        }}
      >
        {tabs.map((tab, index) => (
          <TabPane tab={tab} key={index}></TabPane>
        ))}
      </Tabs>
      <Routes>
        <Route element={<Recommand />} path="/recommand"></Route>
        <Route element={<CustomMade />} path="/customMade"></Route>
        <Route element={<Playlist />} path="/playlist"></Route>
        <Route element={<List />} path="/list"></Route>
        <Route element={<Musician />} path="/musician"></Route>
        <Route element={<NewMusic />} path="/newMusic"></Route>
        <Route
          path="*"
          element={<Navigate to="/home/discover/recommand" />}
        ></Route>
      </Routes>
    </div>
  );
}
