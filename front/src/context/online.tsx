import { useLayoutEffect } from "react";
import { createContext, useState } from "react";

const initalState: {
  onlineState: boolean;
} = {
  onlineState: navigator.onLine,
};

const OnlineCtx = createContext(initalState);
OnlineCtx.displayName = "onLineContext";
export default function Provider({ children }: { children: JSX.Element }) {
  const [onlineState, setOnlineState] = useState(navigator.onLine);
  useLayoutEffect(() => {
    const online = () => {
      console.log("online");
      setOnlineState(true);
    };
    const offline = () => {
      console.log("offline");
      setOnlineState(false);
    };
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);
  return (
    <OnlineCtx.Provider value={{ onlineState }}>{children}</OnlineCtx.Provider>
  );
}

export { OnlineCtx };
