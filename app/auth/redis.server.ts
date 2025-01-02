import { createClient, RedisClientType } from 'redis';
import Redlock from 'redlock';

class RedisClient {
  redisClient: RedisClientType;
  redlock: Redlock;

  constructor() {
    this.redisClient = createClient({ url: process.env?.REDIS_URL });

    // Attach error listener
    this.redisClient.on('error', (err: any) =>
      console.error('Redis connection error:', err)
    );

    // Log Redis connection events
    this.redisClient.on('connect', () => {
      console.log('Redis is connected');
    });

    this.redisClient.on('ready', () => {
      console.log('Redis connection is ready');
    });

    this.redisClient.on('close', () => {
      console.log('Redis connection is closed');
    });

    this.redisClient.on('reconnecting', () => {
      console.log('Redis is reconnecting');
    });

    this.redisClient.on('end', () => {
      console.log('Redis connection has ended');
    });

    this.redisClient.connect().catch(console.error);

    // Initialize Redlock
    this.redlock = new Redlock([this.redisClient], {
      driftFactor: 0.01, // Time to compensate for Redis drift
      retryCount: 10, // Number of retry attempts
      retryDelay: 200 // Time between retries in ms
    });
  }

  async saveToken(key: string, value: { token: string; refreshToken: string }) {
    try {
      return await this.redisClient.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save token');
    }
  }

  async getToken(key: string) {
    try {
      const value = await this.redisClient.get(key);
      return value ? JSON.parse(value) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve token');
    }
  }

  async deleteToken(key: string) {
    try {
      return await this.redisClient.del(key);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete token');
    }
  }

  async lockKey(resource: string, ttl: number = 10000) {
    try {
      const lock = await this.redlock.acquire([`lock:${resource}`], ttl);
      return lock; // Use `lock.release()` to release the lock
    } catch (error) {
      console.error('Failed to acquire lock:', error);
      throw new Error('Failed to lock key');
    }
  }
}

export default RedisClient;
