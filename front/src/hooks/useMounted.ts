import { useEffect, useRef } from "react";

export default function useMounted(callback) {
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      callback();
    } else {
      isMounted.current = true;
    }
  }, []);
}
