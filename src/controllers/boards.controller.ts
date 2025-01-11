import { TypedBody, TypedParam, TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { Try } from 'src/types';
import { createResponseForm } from '../common/interceptiors/transform.interceptor';
import { CreateBoardDto } from '../models/dtos/create-board.dto';
import { BoardEntity } from '../models/tables/board.entity';
import { BoardService } from '../services/boards.service';
import { BoardStatus } from '../types/enums/board-status.enum';

@Controller('api/v1/boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  /**
   * @summary 250108 - 전체 게시물을 조회한다.
   *
   * @tag boards
   * @returns 전체 게시물 List
   */
  @TypedRoute.Get('/')
  async getAllBoard(): Promise<Try<BoardEntity[]>> {
    const boards = await this.boardService.getAllBoards();
    return createResponseForm(boards);
  }

  /**
   * @summary 250108 - 게시물 데이터를 기반으로 새 게시물을 생성한다.
   *
   * @tag boards
   * @param createBoardDto 게시물 데이터
   * @returns 생성한 게시물 Entity
   */
  @TypedRoute.Post('/')
  async createBoard(@TypedBody() createBoardDto: CreateBoardDto): Promise<Try<BoardEntity>> {
    const board = await this.boardService.createBoard(createBoardDto);
    return createResponseForm(board);
  }

  /**
   * @summary 250108 - 게시물 id에 해당하는 게시물을 찾는다.
   *
   * @tag boards
   * @param id 게시물 id
   * @returns 찾아온 게시물 Entity
   */
  @TypedRoute.Get('/:id')
  async getBoardById(@TypedParam('id') id: number): Promise<Try<BoardEntity>> {
    const board = await this.boardService.getBoardById(id);
    return createResponseForm(board);
  }

  /**
   * @summary 250108 - 게시물 id에 해당하는 게시물을 삭제한다.
   *
   * @tag boards
   * @param id 게시물 id
   * @returns 성공한 경우 true를 반환한다.
   */
  @TypedRoute.Delete('/:id')
  async deleteBoardById(@TypedParam('id') id: number): Promise<Try<true>> {
    await this.boardService.deleteBoardById(id);
    return createResponseForm(true);
  }

  /**
   * @summary 250108 - 게시물 id에 해당하는 게시물의 Status를 변경한다.
   *
   * @tag boards
   * @param id 게시물 id
   * @param status 변경할 Status 값
   * @returns 성공한 경우 true를 반환한다.
   */
  @TypedRoute.Patch('/:id/status')
  async updateBoardStatus(@TypedParam('id') id: number, @TypedBody() status: BoardStatus): Promise<Try<true>> {
    await this.boardService.updateBoardStatus(id, status);
    return createResponseForm(true);
  }
}
