import { parse as parseV3 } from './openApi/v3';
import { getOpenApiSpec } from './utils/getOpenApiSpec';
import { isString } from './utils/isString';
import { postProcessClient } from './utils/postProcessClient';
import { readHandlebarsTemplates } from './utils/readHandlebarsTemplates';
import { writeClient } from './utils/writeClient';

export interface Options {
    input: string | Record<string, any>;
    output: string;
    useUnionTypes?: boolean;
    exportCore?: boolean;
    exportServices?: boolean;
    exportSchemas?: boolean;
    write?: boolean;
}

/**
 * Generate the OpenAPI client. This method will read the OpenAPI specification and based on the
 * given language it will generate the client, including the typed models, validation schemas,
 * service layer, etc.
 * @param input The relative location of the OpenAPI spec.
 * @param output The relative location of the output directory.
 * @param useUnionTypes Use inclusive union types.
 * @param exportCore: Generate core client classes.
 * @param exportServices: Generate services.
 * @param exportSchemas: Generate schemas.
 * @param write Write the files to disk (true or false).
 */
export function generate({ input, output, useUnionTypes = false, exportCore = true, exportServices = true, exportSchemas = false, write = true }: Options): void {
    try {
        // Load the specification, load the handlebar templates for the given language
        const openApi = isString(input) ? getOpenApiSpec(input) : input;
        const templates = readHandlebarsTemplates();

        const client = parseV3(openApi);
        const clientFinal = postProcessClient(client, useUnionTypes);
        if (write) {
            writeClient(clientFinal, templates, output, exportCore, exportServices, exportSchemas);
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
