import { Client } from '../client/interfaces/Client';
import { Service } from '../client/interfaces/Service';
import { postProcessServiceImports } from './postProcessServiceImports';
import { postProcessServiceOperations } from './postProcessServiceOperations';

export function postProcessService(service: Service, client: Client): Service {
    const clone = { ...service };
    clone.operations = postProcessServiceOperations(clone, client);
    clone.operations.forEach(operation => {
        clone.imports.push(...operation.imports);
    });
    clone.imports = postProcessServiceImports(clone);
    return clone;
}
