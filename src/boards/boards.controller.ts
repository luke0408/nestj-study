import { Controller } from "@nestjs/common";
import { BoardService } from "./boards.service";

@Controller('boards')
export class BoardController {
    constructor(private boardService: BoardService) {}
}