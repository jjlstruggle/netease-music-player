import $ from "../index";

export const getBanner = async () => {
  const p = await $.get("/banner");
  return p;
};

export const getRecommandPlaylist = async () => {
  const p = await $.get("/personalized?limit=10");
  return p;
};

export const getPersonalized = async () => {
  const p = await $.get("/personalized/privatecontent");
  return p;
};

export const getMv = async () => {
  const p = await $.get("/personalized/mv");
  return p;
};
