import { Module } from '@nestjs/common';
import { CustomTypeOrmModule } from '../configs/typeorm/custom-typeorm.module';
import { BoardRespository } from '../repositories/board.repository';
import { BoardController } from '../controllers/boards.controller';
import { BoardService } from '../services/boards.service';

@Module({
  imports: [CustomTypeOrmModule.forCustomRepository([BoardRespository])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
