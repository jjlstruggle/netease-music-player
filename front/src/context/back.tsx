import { createContext, Dispatch, SetStateAction, useState } from "react";
import img from "../assets/img/back.jpg";
const initalState: {
  imgUrl: string;
  setStore: Dispatch<SetStateAction<string>>;
} = {
  imgUrl: "",
  setStore: () => {},
};

const Ctx = createContext(initalState);

export default function Provider({ children }: { children: JSX.Element }) {
  const [store, setStore] = useState(img);

  return (
    <Ctx.Provider value={{ imgUrl: store, setStore }}>{children}</Ctx.Provider>
  );
}

export { Ctx };
