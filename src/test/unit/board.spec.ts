import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import assert from 'node:assert';
import { describe, it, before } from 'node:test';
import { TypeOrmModuleOptions } from '../../configs/typeorm';
import { BoardController } from '../../controllers/boards.controller';
import { BoardEntity } from '../../models/tables/board.entity';
import { BoardModule } from '../../modules/boards.module';
import { BoardService } from '../../services/boards.service';

describe('BoardController', () => {
  let controller: BoardController;
  let service: BoardService;

  before(async () => {
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
    it('0-1. controller는 정의되어야한다.', async () => {
      assert.notStrictEqual(controller, undefined);
    });

    it('0-2. service는 정의되어야한다.', async () => {
      assert.notStrictEqual(controller, undefined);
    });
  });

  describe('1. GET api/v1/getAllBoard을 호출 할 때', () => {
    describe('리턴 값은', () => {
      
      /**
       * Response
       */
      let list: BoardEntity[] = [];
      let count: number = 0;
      before(async () => {
        const response = await service.getAllBoards();
        list = response;
        count = response.length;
      });

      it('배열의 형태여야 한다.', async () => {
        assert.call(console.log(list))
        assert.strictEqual(list instanceof Array, true);
        assert.strictEqual(typeof length, 'number');
      });
    });
  });

  describe('글을 작성할 때', () => {
    it('작성된 글은 유저가 작성한 글과 동일해야한다.', async () => {
      const board = await controller.createBoard({
        description: 'test description',
        title: 'test title',
      });

      expect(board.data.description).toBe('test description');
      expect(board.data.title).toBe('test title');
    });

    it('작성된 이후의 글 수는 [작성 이전의 글 수 + 1] 이어야 한다.', async () => {
      const before = await controller.getAllBoard();
      const beforeLength = before.data.length;

      await controller.createBoard({
        description: 'test description',
        title: 'test title',
      });

      const after = await controller.getAllBoard();
      const afterLength = after.data.length;

      expect(afterLength).toBe(beforeLength + 1);
    });
  });
});
