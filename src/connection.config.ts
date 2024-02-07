export class ConnectionConfig {
  // path: [ src\app.module.ts ]
  static connURL: string = 'mongodb://127.0.0.1:27017/photos-log';

  // path: [ src\Services\photos-log\logs.service.spec.ts ]
  static serviceDescribe: string = 'logsService';
  // path: [ src\Controllers\photos-log\logs.controller.spec.ts ]
  static controllerDescribe: string = 'LogsController';

  // path: [ src\app.module.ts ] , [ src\Mongo\Repository\log.repository.ts ]
  static modelSchemaDefinition: string = 'log';
  // path: [ src\Controllers\photos-log\logs.controller.ts ]
  static controllerDefinition: string = 'logs';
}
