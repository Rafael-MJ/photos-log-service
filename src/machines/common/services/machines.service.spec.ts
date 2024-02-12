import { Test, TestingModule } from '@nestjs/testing';

import { MachineConfig } from '../../machine.config';
import { MachinesCommonService } from './machines.service';

describe(MachineConfig.serviceDescribe, () => {
  let service: MachinesCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MachinesCommonService],
    }).compile();

    service = module.get<MachinesCommonService>(MachinesCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
