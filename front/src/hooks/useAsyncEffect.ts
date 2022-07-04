import { useEffect } from "react";
const useAsyncEffect = async (callback: Function, dep?: any[]) => {
  useEffect(() => {
    callback();
  }, dep || []);
};

export default useAsyncEffect;
