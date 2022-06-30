import { CookiesSetDetails } from "electron/renderer";

interface Window {
  session: Electron.Session;
}

const { session } = window as unknown as Window;
const cookie = session.cookies;
export default {
  get() {
    return cookie.get({});
  },
  set($cookie: CookiesSetDetails) {
    return cookie.set($cookie);
  },
  remove() {},
};
