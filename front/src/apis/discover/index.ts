import $ from "axios";

export const getBanner = async () => {
  const p = await $.get("/banner");
  return p.data;
};

export const getRecommandPlaylist = async () => {
  const p = await $.get("/personalized?limit=10");
  return p.data;
};

export const getPersonalized = async () => {
  const p = await $.get("/personalized/privatecontent");
  return p.data;
};

export const getMv = async () => {
  const p = await $.get("/personalized/mv");
  return p.data;
};
