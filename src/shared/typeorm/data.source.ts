// src/shared/typeorm/data.source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import path from 'node:path';

function mustEnv(name: string): string {
  const v = process.env[name];
  if (typeof v !== 'string') throw new Error(`Missing env: ${name}`);
  // remove aspas acidentais e espaços
  return v.replace(/^['"]|['"]$/g, '').trim();
}

const root = process.cwd();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: mustEnv('DB_HOST'),
  port: Number(mustEnv('DB_PORT')),
  username: mustEnv('DB_USER'),
  password: mustEnv('DB_PASS'),
  database: mustEnv('DB_NAME'),
  entities: [path.resolve(root, 'src/modules/**/database/entities/*.{ts,js}')],
  migrations: [path.resolve(root, 'src/shared/typeorm/migrations/*.{ts,js}')],
  synchronize: false,
  logging: false,
});
export default AppDataSource;
