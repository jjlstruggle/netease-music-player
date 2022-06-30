import { useEffect } from "react";
const useAsyncEffect = async (callback: Function, dep?: []) => {
  useEffect(() => {
    callback();
  }, dep || []);
};

export default useAsyncEffect;
