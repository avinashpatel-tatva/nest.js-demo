import { Controller, Get } from '@nestjs/common';

@Controller('pediatrician')
export class PediatricianController {
  @Get()
  GetAll() {
    return '✔️';
  }
}
