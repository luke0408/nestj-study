import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm/custom-typeorm.decorator';
import { BoardEntity } from '../tables/board.entity';

@CustomRepository(BoardEntity)
export class BoardRespository extends Repository<BoardEntity> {}
