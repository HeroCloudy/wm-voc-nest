import { Controller, Get } from '@nestjs/common';

@Controller('survey')
export class SurveyController {
  @Get()
  findAll() {
    return {
      list: [1, 2, 3],
      count: 100,
    };
  }
}
