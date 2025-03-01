// import RedisClient from '~/auth/redis.server';

class MemoryStore {
  private store: Map<string, string>;
  private locks: Set<string>;

  constructor() {
    this.store = new Map();
    this.locks = new Set();
  }

  // Simulate a lock with a simple Set
  async lockKey(resource: string, ttl: number = 5000) {
    if (this.locks.has(resource)) {
      throw new Error('Resource is already locked.');
    }
    this.locks.add(resource);

    setTimeout(() => {
      this.locks.delete(resource);
    }, ttl);

    return () => this.locks.delete(resource); // Unlock function
  }

  // Save token
  async saveToken(key: string, value: { token: string; refreshToken: string }) {
    this.store.set(key, JSON.stringify(value));
  }

  // Get token
  async getToken(
    key: string
  ): Promise<{ token: string; refreshToken: string } | undefined> {
    const value = this.store.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  // Delete token
  async deleteToken(key: string) {
    this.store.delete(key);
  }

  // Set cache with TTL
  async setCache<T>(key: string, value: T, ttl: number = 3600) {
    this.store.set(key, JSON.stringify(value));
    setTimeout(() => this.store.delete(key), ttl * 1000); // Auto-delete after TTL expires
  }

  // Get cache
  async getCache<T>(key: string): Promise<T | null> {
    const value = this.store.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  // Delete cache
  async deleteCache(key: string) {
    this.store.delete(key);
  }
}

export const redisClient = new MemoryStore();
