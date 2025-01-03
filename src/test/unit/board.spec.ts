import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from 'src/configs';
import { BoardController } from 'src/controllers/boards.controller';
import { BoardEntity } from 'src/entities/board.entity';
import { BoardModule } from 'src/modules/boards.module';
import { BoardService } from 'src/services/boards.service';

describe('BoardController', () => {
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

  it('controller, service를 정의한다.', async () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('controller.getAllBoard는 배열을 리턴한다.', async () => {
    const response = controller.getAllBoard();
    expect((await response).length).toBeDefined();
    expect(response instanceof Array).toBe(true);
  });

  describe('글을 작성할 때', () => {
    it('작성된 글은 유저가 작성한 글과 동일해야한다.', async () => {
      const board = await controller.createBoard({
        description: 'test description',
        title: 'test title',
      });

      expect(board.description).toBe('test description');
      expect(board.title).toBe('test title');
    });

    it('작성된 이후의 글 수는 [작성 이전의 글 수 + 1] 이어야 한다.', async () => {
      const before = await controller.getAllBoard();
      const beforeLength = before.length;

      await controller.createBoard({
        description: 'test description',
        title: 'test title',
      });

      const after = await controller.getAllBoard();
      const afterLength = after.length;

      expect(afterLength).toBe(beforeLength + 1);
    });
  });
});
