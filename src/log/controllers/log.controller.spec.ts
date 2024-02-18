import { Test, TestingModule } from '@nestjs/testing';

import { LogConfig } from '../log.config';
import { LogController } from './log.controller';

describe(LogConfig.controllerDescribe, () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
