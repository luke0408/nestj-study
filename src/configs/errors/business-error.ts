// eslint-disable-next-line @typescript-eslint/no-namespace

import { ERROR } from '.';

export interface TEST_ERRO_RESPONSE extends ERROR {
    type: 'business';
    result: false;
    code: 5001;
    data: '테스트용 에러 메시지 입니다.';
}