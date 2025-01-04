import { createClient, RedisClientType } from 'redis';
import createLock from 'redis-lock';

class RedisClient {
  redisClient: RedisClientType;
  lock: ReturnType<typeof createLock>;

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
}

export default RedisClient;
