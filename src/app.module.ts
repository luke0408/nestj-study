import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardModule } from './modules/boards.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule],
})
export class AppModule {}
