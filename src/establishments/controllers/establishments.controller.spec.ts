import { Test, TestingModule } from '@nestjs/testing';

import { EstablishmentConfig } from '../establishment.config';
import { EstablishmentsController } from './establishments.controller';

describe(EstablishmentConfig.controllerDescribe, () => {
  let controller: EstablishmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentsController],
    }).compile();

    controller = module.get<EstablishmentsController>(EstablishmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
