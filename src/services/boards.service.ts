import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../entities/dtos/create-board.dto';
import { BoardRespository } from '../repositories/board.repository';
import { BoardStatus } from '../types/enums/board-status.enum';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRespository)
    private boardRepository: BoardRespository,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title: title,
      descrition: description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);
    return board;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return board;
  }

  async deleteBoardById(id: number): Promise<void> {
    await this.boardRepository.softDelete(id);
  }
}
