import { ComponentType, lazy, ReactNode, Suspense } from "react";
const useLazy = (
  component: Promise<{ default: ComponentType }>,
  Loading?: ReactNode
) => {
  const LazyComponet = lazy(() => component);
  return (
    <Suspense fallback={Loading ? Loading : <div>loading...</div>}>
      <LazyComponet />
    </Suspense>
  );
};

export default useLazy;
