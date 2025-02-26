import { Column, Entity } from 'typeorm';
import { BoardStatus } from '../../types/enums/board-status.enum';
import { CommonColums } from '../common/common-columns';

@Entity({ name: 'board'})
export class BoardEntity extends CommonColums {
  @Column({ type: 'varchar', length: 512 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'enum', enumName: 'BoardStatusType', enum: BoardStatus, default: BoardStatus.PUBLIC })
  status!: BoardStatus;
}
