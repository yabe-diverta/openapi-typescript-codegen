import * as fs from 'fs';
import * as path from 'path';

import { Client } from '../client/interfaces/Client';
import { getModelNames } from './getModelNames';
import { getServiceNames } from './getServiceNames';
import { Templates } from './readHandlebarsTemplates';

/**
 * Generate the OpenAPI client index file using the Handlebar template and write it to disk.
 * The index file just contains all the exports you need to use the client as a standalone
 * library. But yuo can also import individual models and services directly.
 * @param client Client object, containing, models, schemas and services.
 * @param templates The loaded handlebar templates.
 * @param outputPath Directory to write the generated files to.
 * @param exportCore: Generate core.
 * @param exportSchemas: Generate schemas.
 */
export function writeClientIndex(client: Client, templates: Templates, outputPath: string, exportCore: boolean, exportSchemas: boolean): void {
    fs.writeFileSync(
        path.resolve(outputPath, 'index.ts'),
        templates.index({
            exportCore,
            exportSchemas,
            server: client.server,
            version: client.version,
            models: getModelNames(client.models),
            services: getServiceNames(client.services),
        })
    );
}
