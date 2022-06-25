const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const { isIntersecting } = entry;
    const target: HTMLImageElement = entry.target as HTMLImageElement;
    if (isIntersecting) {
      let img = new Image();
      let originSrc = target.getAttribute("data-src")!;
      img.src = originSrc;
      img.onload = () => {
        target.src = originSrc;
      };
      io.unobserve(target);
    }
  });
});

export default io;
