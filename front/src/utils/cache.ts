class Cache {
  store;
  constructor(defaultStore = {}) {
    this.store = defaultStore;
  }
  set(key: string, value: any) {
    this.store[key] = value;
  }
  get(key: string) {
    return this.store[key] || null;
  }
}

export default new Cache();
