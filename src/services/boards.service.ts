import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from '../models/dtos/create-board.dto';
import { BoardEntity } from '../models/tables/board.entity';
import { BoardRespository } from '../models/repositories/board.repository';
import { BoardStatus } from '../types/enums/board-status.enum';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRespository) 
    private readonly boardRepository: BoardRespository,
  ) {}

  async createBoard({title, description}: CreateBoardDto): Promise<BoardEntity> {
    const board = await this.boardRepository.save(
      BoardEntity.create({
        title: title,
        description: description,
        status: BoardStatus.PUBLIC,
      }),
    );

    return board;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<BoardEntity> {
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
