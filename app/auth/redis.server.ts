import { createClient, RedisClientType } from 'redis';
import createLock from 'redis-lock';

import { getEnv } from '~/server/env';

const { REDIS_URL } = getEnv(process.env);

class RedisClient {
  redisClient: RedisClientType;
  lock: ReturnType<typeof createLock>;

  constructor() {
    this.redisClient = createClient({ url: REDIS_URL });

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

    // Create lock
    this.lock = createLock(this.redisClient);
  }

  async lockKey(resource: string, ttl: number = 5000) {
    try {
      const unlock = await this.lock(resource, ttl); // Acquires lock for the given TTL
      return unlock; // Use unlock() to release the lock
    } catch (error) {
      console.error('Failed to acquire lock:', error);
      throw error;
    }
  }

  async saveToken(key: string, value: { token: string; refreshToken: string }) {
    try {
      return await this.redisClient.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to save token');
    }
  }

  async getToken(
    key: string
  ): Promise<{ token: string; refreshToken: string }> {
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

  // Using redis instead of node cache to store data of pages like about-us, contact-us etc
  // Cache Methods
  async setCache<T>(key: string, value: T, ttl: number = 3600) {
    try {
      await this.redisClient.set(key, JSON.stringify(value), { EX: ttl });
    } catch (error) {
      console.error('Failed to set cache:', error);
    }
  }

  async getCache<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redisClient.get(key);
      return value ? (JSON.parse(value) as T) : null; // Ensure correct type
    } catch (error) {
      console.error('Failed to get cache:', error);
      return null;
    }
  }

  async deleteCache(key: string) {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      console.error('Failed to delete cache:', error);
    }
  }
}

export default RedisClient;
