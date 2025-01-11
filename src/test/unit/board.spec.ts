import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateBoardDto } from '../../models/dtos/create-board.dto';
import { TypeOrmModuleOptions } from '../../configs/typeorm';
import { BoardController } from '../../controllers/boards.controller';
import { BoardEntity } from '../../models/tables/board.entity';
import { BoardModule } from '../../modules/boards.module';
import { BoardService } from '../../services/boards.service';

describe('Board Entity', () => {
  let controller: BoardController;
  let service: BoardService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
        TypeOrmModule.forFeature([BoardEntity]),
        ConfigModule.forRoot({ isGlobal: true }),
        BoardModule,
      ],
      controllers: [],
      providers: [],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);
  });

  describe('0. 테스트 환경을 확인한다.', () => {
    it('0-1. controller는 정의되어야한다.', () => {
      expect(controller).toBeDefined();
    });

    it('0-2. service는 정의되어야한다.', () => {
      expect(service).toBeDefined();
    });
  });

  describe('1. GET api/v1/boards', () => {
    describe('전체 게시물 조회시 리턴 값은', () => {
      /**
       * Response
       */
      let list: BoardEntity[] = [];
      let count: Number = 0;
      beforeAll(async () => {
        const response = await service.getAllBoards();
        list = response;
        count = response.length;
      });

      it('배열의 형태여야 한다.', () => {
        expect(list).toBeInstanceOf(Array);
        expect(typeof count).toEqual("number");
      });
    });
  });

  describe('2. POST api/v1/borard', () => {
    /**
     * Request
     */
    const requset: CreateBoardDto = {
      title: 'test title',
      description: 'test description',
    };

    describe('게시물 생성시 리턴 값은', () => {
      it('유저의 요청 값을 유지해야한다.', async () => {
        const response = await service.createBoard(requset);

        expect(response.title).toBe(requset.title);
        expect(response.description).toBe(requset.description);
      });
    });

    describe('게시물 생성 이후', () => {
      /**
       * Response
       */
      let before_list: BoardEntity[] = [];
      let before_count: number = 0;
      beforeAll(async () => {
        const before_response = await service.getAllBoards();
        before_list = before_response;
        before_count = before_response.length;
      });

      it('작성된 글의 수는 1개가 늘어나야 한다.', async () => {
        await service.createBoard(requset);
        const after_response = await service.getAllBoards();
        const after_count = after_response.length;

        expect(after_count).toBe(before_count + 1);
      });
    });
  });
});
