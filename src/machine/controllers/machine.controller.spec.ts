import { Test, TestingModule } from '@nestjs/testing';

import { MachineConfig } from '../machine.config';
import { MachinesController } from './machine.controller';

describe(MachineConfig.controllerDescribe, () => {
  let controller: MachinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachinesController],
    }).compile();

    controller = module.get<MachinesController>(MachinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
