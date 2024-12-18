import { Param, Body, Get, Post, Controller } from "@nestjs/common";
import { BoardService } from "./boards.service";
import { Board } from "./board.model";
import { CreateBoardDto } from "./dto/create-board.dto";

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
}