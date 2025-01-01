import { Repository } from 'typeorm';
import { CustomRepository } from 'src/configs/custom.typeorm.decorator';
import { Board } from './board.entity';

@CustomRepository(Board)
export class BoardRespository extends Repository<Board> {}
