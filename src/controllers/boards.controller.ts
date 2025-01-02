import { Param, Body, Get, Post, Delete, Patch, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../entities/dtos/create-board.dto';
import { BoardStatusValidationPipe } from '../pipes/board-status-validation.pipe';
import { BoardService } from '../services/boards.service';
import { BoardStatus } from '../types/enums/board-status.enum';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: number): Promise<void> {
    return this.boardService.deleteBoardById(id);
  }

  @Patch('/:id/status')
  updateBoardStatus(@Param('id') id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
    return this.boardService.updateBoardStatus(id, status);
  }
}
