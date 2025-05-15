import { Module } from '@nestjs/common';
import { PediatricianController } from './pediatrician.controller';

@Module({
  controllers: [PediatricianController]
})
export class PediatricianModule {}
