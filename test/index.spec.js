const OpenAPI = require('../dist');
const glob = require('glob');
const fs = require('fs');

describe('generation', () => {
    describe('v3', () => {
        OpenAPI.generate({
            input: './test/mock/v3/spec.json',
            output: './test/result/v3/',
        });

        test.each(glob.sync('./test/result/v3/**/*.ts').map(file => [file]))('file(%s)', file => {
            const content = fs.readFileSync(file, 'utf8').toString();
            expect(content).toMatchSnapshot(file);
        });
    });
});
