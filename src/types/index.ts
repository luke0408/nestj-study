/* eslint-disable @typescript-eslint/no-namespace */
import type { ERROR } from 'src/configs/errors';

/**
 * Common Util Types
 */
export type Merge<F, S> = {
  [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

/**
 * Response Form
 */
export interface ResponseForm<T> {
  result: true;
  code: 1000;
  requestToResponse?: `${number}ms`;
  data: T;
}

/**
 * Error Util Types
 */
export type KeyOfError = keyof ERROR;
export type ValueOfError = ERROR[KeyOfError];

/**
 * Pagination Types
 *
 * TODO: 하나의 인터페이스로 통합하기. ex) PaginationForm을 사용하지 않고 반환값 구현 등
 */
export interface InitialPaginationResponseType {
  list: any[];
  count: number;
}

export interface PaginationResponseType<T extends InitialPaginationResponseType> {
  list: T['list'];
  count: T['count'];
  totalResult: number;
  totalPage: number;
  search?: string;
  page: number;
}

export interface PaginationForm<T extends InitialPaginationResponseType> {
  result: true;
  code: 1000;
  requestToResponse?: `${number}ms`;
  data: PaginationResponseType<T>;
}

/**
 * Try-Catch Types
 */
export type Try<T> = ResponseForm<T>;
export type TryCatch<T, E extends ValueOfError> = ResponseForm<T> | E;
export type TryPagination<T extends InitialPaginationResponseType> = PaginationForm<T>;
export type TryCatchPagination<T extends InitialPaginationResponseType, E extends ValueOfError> = PaginationForm<T> | E;
