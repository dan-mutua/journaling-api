import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

export const config = {
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOST,
  port: Number(process.env.POSTGRES_DATABASE_PORT),
  username: process.env.POSTGRES_DATABASE_USERNAME,
  password: process.env.POSTGRES_DATABASE_PASSWORD,
  database: process.env.POSTGRES_DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: true,
  cache: true,
  logging: ['error'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
