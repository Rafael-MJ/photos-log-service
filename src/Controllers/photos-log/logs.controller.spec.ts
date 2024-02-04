import { Test, TestingModule } from '@nestjs/testing';

import { ConnectionConfig } from 'src/connection.config';
import { LogsController } from './logs.controller';

describe(ConnectionConfig.controllerDescribe, () => {
  let controller: LogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
    }).compile();

    controller = module.get<LogsController>(LogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});