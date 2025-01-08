import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions as OrmOptions } from '@nestjs/typeorm';

export const TypeOrmModuleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  userFactory: async (configService: ConfigService): Promise<OrmOptions> => {
    const NODE_ENV = configService.get('NODE_ENV');

    const option = {
      type: configService.get('DB_TYPE'),
      host: configService.get(`${NODE_ENV}_DB_HOST`),
      port: Number(configService.get<number>(`${NODE_ENV}_DB_PORT`)),
      username: configService.get(`${NODE_ENV}_DB_USERNAME`),
      database: configService.get(`${NODE_ENV}_DB_DATABASE`),
      password: configService.get(`${NODE_ENV}_DB_PASSWORD`),
      entities: [path.join(__dirname, '../entities/*.entity.ts')],
      synchronize: NODE_ENV === 'LOCAL' ? true : false,
      ...(NODE_ENV === 'DEVELOPMENT' || NODE_ENV === 'LOCAL'
        ? { retryAttempts: 10, logging: true }
        : { logging: false }),
    };

    return option;
  },
};
