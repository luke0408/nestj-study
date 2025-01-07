/* eslint-disable @typescript-eslint/no-namespace */

import type { ERROR } from "src/configs/errors";

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
