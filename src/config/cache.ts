// src/config/cache.ts
import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: 'redis';
}

const portEnv = process.env.REDIS_PORT ?? '6379';
const port = Number(portEnv);
if (Number.isNaN(port)) {
  throw new Error(`REDIS_PORT inválida: "${portEnv}"`);
}

const cacheConfig: ICacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST ?? '127.0.0.1',
      port,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  },
};

export default cacheConfig;
