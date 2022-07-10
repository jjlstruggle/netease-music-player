import { useState } from "react";
import useAsyncEffect from "./useAsyncEffect";
const useHttp = async (AsyncRequest: Function, dep?: any[]) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(undefined);
  const [status, setStatus] = useState<number>(0);
  useAsyncEffect(async () => {
    try {
      const res = await AsyncRequest();
      setLoading(false);
      setStatus(200);
      setData(res);
    } catch (e) {
      const errInfo = {
        code: e.response.status,
        info: e.response.statusText,
        data: null,
      };
      setLoading(false);
      setStatus(e.response.status);
      setData(errInfo);
    }
  }, dep);
  return { loading, data, status };
};
export default useHttp;
