import { CustomRepository } from "src/configs/custom.typeorm.decorator";
import { Board } from "./board.entity";
import { Repository } from "typeorm";

@CustomRepository(Board)
export class BoardRespository extends Repository<Board> {}