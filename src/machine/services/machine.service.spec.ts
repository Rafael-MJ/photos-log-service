import { Test, TestingModule } from '@nestjs/testing';

import { MachineConfig } from '../machine.config';
import { MachineService } from './machine.service';

describe(MachineConfig.serviceDescribe, () => {
  let service: MachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachineService],
    }).compile();

    service = module.get<MachineService>(MachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
