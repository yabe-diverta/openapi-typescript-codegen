import * as OpenAPI from '.';

describe('index', () => {
    it('parses v3 without issues', () => {
        OpenAPI.generate({
            input: './test/mock/v3/spec.json',
            output: './test/result/v3/',
            write: false,
        });
    });
});
