import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogConfig } from './logs/log.config';
import { LogsController } from './logs/controllers/logs.controller';
import { LogsService } from './logs/services/logs.service';
import { LogRepository } from './logs/log.repository';
import { LogSchema } from './logs/schemas/log.schema';
import { CommonConfig } from './common/config';
import { MachineConfig } from './machines/machine.config';
import { MachineSchema } from './machines/schemas/machine.schema';
import { MachinesController } from './machines/controllers/machines.controller';
import { MachinesService } from './machines/services/machines.service';
import { MachineRepository } from './machines/machine.repository';
import { MachinesCommonService } from './machines/common/services/machines.service';

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
