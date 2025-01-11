import { UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CreatedAtColumn } from './createdat-columns';

export abstract class TimeColumns extends CreatedAtColumn {
  @UpdateDateColumn()
  public readonly updatedAt!: Date | string;

  @DeleteDateColumn()
  public readonly deletedAt?: Date | string;
}