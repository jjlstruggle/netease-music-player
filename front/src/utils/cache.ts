class Cache {
  store: {};
  set(key, value) {
    this.store[key] = value;
  }
  get(key) {
    return this.store[key] || null;
  }
}

export default new Cache();
