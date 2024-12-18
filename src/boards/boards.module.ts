import { Module } from "@nestjs/common";
import { BoardController } from "./boards.controller";
import { BoardService } from "./boards.service";

@Module({
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule {}