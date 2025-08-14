// src/shared/cache/RedisCache.ts
import Redis from 'ioredis';
import type { Redis as RedisClient, RedisOptions } from 'ioredis';
import cacheConfig from '@config/cache.js';

// 👇 Força o tipo construtor
const RedisCtor = Redis as unknown as new (opts?: RedisOptions) => RedisClient;

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    // 👇 Usa o construtor tipado
    this.client = new RedisCtor(cacheConfig.config.redis);
  }

  async save<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds && ttlSeconds > 0) {
      await this.client.set(key, payload, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, payload);
    }
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

    async invalidate(key: string): Promise< void >{
    await this.client.del(key);
  }
}
