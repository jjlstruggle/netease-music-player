import { Spin } from "antd";
import { ComponentType, lazy, ReactNode, Suspense } from "react";
const useLazy =
  (component: Promise<{ default: ComponentType }>, Loading?: ReactNode) =>
  (props) => {
    const LazyComponet = lazy(() => component);
    return (
      <Suspense fallback={Loading ? Loading : <Spin />}>
        <LazyComponet {...props} />
      </Suspense>
    );
  };

export default useLazy;
