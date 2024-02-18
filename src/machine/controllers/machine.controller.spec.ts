import { Test, TestingModule } from '@nestjs/testing';

import { MachineConfig } from '../machine.config';
import { MachineController } from './machine.controller';

describe(MachineConfig.controllerDescribe, () => {
  let controller: MachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineController],
    }).compile();

    controller = module.get<MachineController>(MachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
