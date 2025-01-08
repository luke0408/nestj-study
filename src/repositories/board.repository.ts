import { Repository } from 'typeorm';
import { CustomRepository } from '../configs/custom-typeorm.decorator';
import { BoardEntity } from '../models/tables/board.entity';

@CustomRepository(BoardEntity)
export class BoardRespository extends Repository<BoardEntity> {}
