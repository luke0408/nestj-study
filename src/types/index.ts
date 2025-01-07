/**
 * Merge two types into a new type.
 * This type can be useful to override or add fields to a type.
 */
export type Merge<F, S> = {
    [K in keyof (F & S)]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never;
};

export interface ResponseForm<T> {
    result: true;
    code: 1000;
    requestToResponse?: `${number}ms`;
    data: T;
}
