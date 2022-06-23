if (window.isElectron) {
  window.onload = () => {
    const { ipcRenderer } = window;

    var max = document.getElementById("max");
    if (max) {
      max.addEventListener("click", () => {
        ipcRenderer.send("window-max");
      });
    }

    var min = document.getElementById("min");
    if (min) {
      min.addEventListener("click", () => {
        ipcRenderer.send("window-min");
      });
    }

    var close = document.getElementById("exit");
    if (close) {
      close.addEventListener("click", () => {
        ipcRenderer.send("window-close");
      });
    }
  };
}
