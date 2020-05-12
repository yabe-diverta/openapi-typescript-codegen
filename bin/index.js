#!/usr/bin/env node

'use strict';

const path = require('path');
const program = require('commander');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .option('--input [value]', 'Path to swagger specification', './spec.json')
    .option('--output [value]', 'Output directory', './generated')
    .option('--useUnionTypes', 'Use inclusive union types', false)
    .option('--exportCore', 'Generate core', true)
    .option('--exportSchemas', 'Generate schemas', false)
    .parse(process.argv);

const OpenAPI = require(path.resolve(__dirname, '../dist/index.js'));

if (OpenAPI) {
    OpenAPI.generate({
        input: program.input,
        output: program.output,
        useUnionTypes: program.useUnionTypes,
        exportCore: program.exportCore,
        exportSchemas: program.exportSchemas,
    });
}
