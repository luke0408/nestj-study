import { Get, Controller } from "@nestjs/common";
import { BoardService } from "./boards.service";
import { Board } from "./board.model";

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }
}