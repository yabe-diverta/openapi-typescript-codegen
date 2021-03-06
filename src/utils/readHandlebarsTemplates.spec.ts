import * as fs from 'fs';

import { readHandlebarsTemplates } from './readHandlebarsTemplates';

jest.mock('fs');

const fsExistsSync = fs.existsSync as jest.MockedFunction<typeof fs.existsSync>;
const fsReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;

describe('readHandlebarsTemplates', () => {
    it('should read the templates', () => {
        fsExistsSync.mockReturnValue(true);
        fsReadFileSync.mockReturnValue('{{{message}}}');

        const template = readHandlebarsTemplates();

        expect(template).toBeDefined();
        expect(template.index).toBeDefined();
        expect(template.model).toBeDefined();
        expect(template.service).toBeDefined();
        expect(template.settings).toBeDefined();
        expect(template.index({ message: 'Hello World!' })).toEqual('Hello World!');
        expect(template.model({ message: 'Hello World!' })).toEqual('Hello World!');
        expect(template.service({ message: 'Hello World!' })).toEqual('Hello World!');
        expect(template.settings({ message: 'Hello World!' })).toEqual('Hello World!');
    });
});
