import { Test, TestingModule } from '@nestjs/testing';
import { PediatricianController } from './pediatrician.controller';

describe('PediatricianController', () => {
  let controller: PediatricianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PediatricianController],
    }).compile();

    controller = module.get<PediatricianController>(PediatricianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
