import { Test, TestingModule } from '@nestjs/testing';

import { EstablishmentConfig } from '../establishment.config';
import { EstablishmentService } from './establishment.service';

describe(EstablishmentConfig.serviceDescribe, () => {
  let service: EstablishmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentService],
    }).compile();

    service = module.get<EstablishmentService>(EstablishmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
