import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from '../types/enums/board-status.enum';
import { CommonEntity } from './common/common.entity';

@Entity()
export class BoardEntity extends CommonEntity {
  @Column({ type: 'text', length: 512 })
  title: string;

  @Column('text')
  descrition: string;

  @Column('enum')
  status: BoardStatus;
}
