import { v1 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoardById(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
