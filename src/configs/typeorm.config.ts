import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 33006,
  username: 'root',
  password: 'password',
  database: 'testDB',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
};
