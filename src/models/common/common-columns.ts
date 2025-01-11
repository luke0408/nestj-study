import { PrimaryGeneratedColumn } from 'typeorm';
import { TimeColumns } from './time-columns';

export class CommonColums extends TimeColumns {
  @PrimaryGeneratedColumn()
  public id!: number;
}
