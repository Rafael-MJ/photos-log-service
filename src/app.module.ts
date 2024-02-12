import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogConfig } from './models/logs/log.config';
import { LogsController } from './models/logs/controllers/logs.controller';
import { LogsService } from './models/logs/services/logs.service';
import { LogRepository } from './models/logs/log.repository';
import { LogSchema } from './models/logs/schemas/log.schema';
import { CommonConfig } from './common/config';
import { MachineConfig } from './models/machines/machine.config';
import { MachineSchema } from './models/machines/schemas/machine.schema';
import { MachinesController } from './models/machines/controllers/machines.controller';
import { MachinesService } from './models/machines/services/machines.service';
import { MachineRepository } from './models/machines/machine.repository';
import { MachinesCommonService } from './models/machines/common/services/machines.service';

@Module({
  imports: [
    MongooseModule.forRoot(CommonConfig.mongoConnectionURL),

    MongooseModule.forFeature([
      { name: LogConfig.modelSchemaDefinition, schema: LogSchema },
      { name: MachineConfig.modelSchemaDefinition, schema: MachineSchema },
    ]),
  ],
  controllers: [LogsController, MachinesController],
  providers: [
    LogsService,
    LogRepository,
    MachinesService,
    MachineRepository,
    MachinesCommonService,
  ],
})
export class AppModule {}
