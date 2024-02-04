export class ConnectionConfig {
    // [ src\app.module.ts ] \\
    static connURL: string = 'mongodb://127.0.0.1:27017/photos-log';

    // [ src\Services\photos-log\logs.service.spec.ts ] \\
    static serviceDescribe: string = 'logsService';
    // [ src\Controllers\photos-log\logs.controller.spec.ts ] \\
    static controllerDescribe: string = 'LogsController';

    // [ src\app.module.ts ] , [ src\Mongo\Repository\log.repository.ts ] \\
    static modelSchemaDefinition: string = 'log';
    // [ src\Controllers\photos-log\logs.controller.ts ] \\
    static controllerDefinition: string = 'logs';
}