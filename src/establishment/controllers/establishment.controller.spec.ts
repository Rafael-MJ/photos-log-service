import { Test, TestingModule } from '@nestjs/testing';

import { EstablishmentConfig } from '../establishment.config';
import { EstablishmentController } from './establishment.controller';

describe(EstablishmentConfig.controllerDescribe, () => {
  let controller: EstablishmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablishmentController],
    }).compile();

    controller = module.get<EstablishmentController>(EstablishmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
