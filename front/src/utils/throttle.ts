export default function throttle(call: Function, wait?: number) {
  wait = wait || 1000;
  let timer: number | undefined;

  return {
    run: (...args) => {
      if (timer) return;
      call(...args);
      // @ts-ignore
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    },
    cancel: () => clearTimeout(timer),
  };
}
