import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogConfig } from './models/logs/log.config';
import { LogsController } from './models/logs/controllers/logs.controller';
import { logsService } from './models/logs/services/logs.service';
import { LogRepository } from './models/logs/log.repository';
import { LogSchema } from './models/logs/schemas/log.schema';
import { CommonConfig } from './common/config';

@Module({
  imports: [
    MongooseModule.forRoot(CommonConfig.mongoConnectionURL),

    MongooseModule.forFeature([{ name: LogConfig.modelSchemaDefinition, schema: LogSchema }]),
  ],
  controllers: [LogsController],
  providers: [logsService, LogRepository],
})
export class AppModule {}
