// Storage utility — replaces Claude's window.storage with localStorage
// Same API so all dashboard components work without changes

const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(`rk_${key}`);
      if (value === null) throw new Error('Key not found');
      return { key, value };
    } catch (e) {
      throw e;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(`rk_${key}`, value);
      return { key, value };
    } catch (e) {
      return null;
    }
  },
  async delete(key) {
    try {
      localStorage.removeItem(`rk_${key}`);
      return { key, deleted: true };
    } catch (e) {
      return null;
    }
  },
  async list(prefix = '') {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith(`rk_${prefix}`)) {
        keys.push(k.replace('rk_', ''));
      }
    }
    return { keys };
  }
};

// Polyfill window.storage for all dashboard components
if (typeof window !== 'undefined') {
  window.storage = storage;
}

export default storage;
