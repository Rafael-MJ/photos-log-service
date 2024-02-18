import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogConfig } from './log/log.config';
import { LogController } from './log/controllers/log.controller';
import { LogService } from './log/services/log.service';
import { LogRepository } from './log/log.repository';
import { LogSchema } from './log/schemas/log.schema';
import { DatabaseConfig } from './common/database/database.config';
import { MachineConfig } from './machine/machine.config';
import { MachineSchema } from './machine/schemas/machine.schema';
import { MachineController } from './machine/controllers/machine.controller';
import { MachineService } from './machine/services/machine.service';
import { MachineRepository } from './machine/machine.repository';
import { EstablishmentConfig } from './establishment/establishment.config';
import { EstablishmentSchema } from './establishment/schemas/establishment.schema';
import { EstablishmentController } from './establishment/controllers/establishment.controller';
import { EstablishmentService } from './establishment/services/establishment.service';
import { EstablishmentRepository } from './establishment/establishment.repository';

@Module({
  imports: [
    MongooseModule.forRoot(DatabaseConfig.getMongoConnectionURL()),
    MongooseModule.forFeature([
      { name: LogConfig.modelSchemaDefinition, schema: LogSchema },
      { name: MachineConfig.modelSchemaDefinition, schema: MachineSchema },
      { name: EstablishmentConfig.modelSchemaDefinition, schema: EstablishmentSchema },
    ]),
  ],
  controllers: [LogController, MachineController, EstablishmentController],
  providers: [
    LogService,
    LogRepository,
    MachineService,
    MachineRepository,
    EstablishmentService,
    EstablishmentRepository,
  ],
})
export class AppModule {}
