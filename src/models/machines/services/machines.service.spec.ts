import { Test, TestingModule } from '@nestjs/testing';

import { MachineConfig } from '../machine.config';
import { MachinesService } from './machines.service';

describe(MachineConfig.serviceDescribe, () => {
  let service: MachinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachinesService],
    }).compile();

    service = module.get<MachinesService>(MachinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
