import { Param, Body, Get, Post, Delete, Patch, Controller } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    return this.boardService.deleteBoardById(id);
  }

  @Patch('/:id')
  updateBoardStatus(id: string, status: BoardStatus) {
    return this.boardService.updateBoardStatus(id, status);
  }
}
