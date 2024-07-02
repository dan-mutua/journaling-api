import { config } from 'src/configs/typeorm.config';
import { DataSourceOptions, createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection(config as DataSourceOptions),
  },
];
