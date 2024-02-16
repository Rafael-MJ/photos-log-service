import { Test, TestingModule } from '@nestjs/testing';

import { EstablishmentConfig } from '../establishment.config';
import { EstablishmentsService } from './establishment.service';

describe(EstablishmentConfig.serviceDescribe, () => {
  let service: EstablishmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstablishmentsService],
    }).compile();

    service = module.get<EstablishmentsService>(EstablishmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
