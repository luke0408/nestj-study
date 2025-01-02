import { PipeTransform, BadRequestException } from '@nestjs/common';
import { BoardStatus } from '../types/enums/board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusValid(status: string) {
    const index = this.StatusOptions.indexOf(status as BoardStatus);
    return index !== -1; // 유효한 값만 리턴
  }
}
