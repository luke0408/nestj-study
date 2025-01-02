import { Repository } from 'typeorm';
import { CustomRepository } from '../configs/custom-typeorm.decorator';
import { Board } from '../entities/board.entity';

@CustomRepository(Board)
export class BoardRespository extends Repository<Board> {}
