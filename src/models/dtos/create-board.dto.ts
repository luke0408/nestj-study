import { BoardEntity } from '../tables/board.entity';

export interface CreateBoardDto extends Pick<BoardEntity, 'title' | 'description'> {}
