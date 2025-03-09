import RedisClient from '~/auth/redis.server';

export const redisClient = new RedisClient();

export const getUserIp = (request: Request) => {
  const ip =
    request.headers.get('CF-Connecting-IP') || // Cloudflare real IP
    request.headers.get('X-Forwarded-For')?.split(',')[0].trim() || // First IP in the list
    request.headers.get('X-Real-IP'); // Some proxies use this

  return ip;
};
