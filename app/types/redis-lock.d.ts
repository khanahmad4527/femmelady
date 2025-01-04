declare module 'redis-lock' {
    import { RedisClientType } from 'redis';
  
    type LockReleaseFunction = () => Promise<void>;
  
    function redisLock(
      client: RedisClientType,
      retryDelay?: number
    ): (lockName: string, timeout?: number) => Promise<LockReleaseFunction>;
  
    export = redisLock;
  }
  