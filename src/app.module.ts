import { Module } from '@nestjs/common';
import { BoardModule } from './boards/boards.module';

@Module({
  imports: [BoardModule],
})
export class AppModule {}