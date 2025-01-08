import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from './configs/typeorm';
import { BoardModule } from './modules/boards.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(TypeOrmModuleOptions), ConfigModule.forRoot({ isGlobal: true }), BoardModule],
})
export class AppModule {}
