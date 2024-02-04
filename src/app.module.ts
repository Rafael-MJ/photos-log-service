import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogsController } from './Controllers/photos-log/logs.controller';
import { logsService } from './Services/photos-log/logs.service';
import { LogRepository } from './Mongo/Repository/log.repository';
import { LogSchema } from './Mongo/Schemas/log.schema';
import { ConnectionConfig } from './connection.config';

@Module({
  imports: [

    MongooseModule.forRoot(ConnectionConfig.connURL),

    MongooseModule.forFeature([
      { name: ConnectionConfig.modelSchemaDefinition, schema: LogSchema}
    ])

  ],
  controllers: [LogsController],
  providers: [logsService, LogRepository],
})

export class AppModule {}