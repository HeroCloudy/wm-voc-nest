import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('survey')
export class SurveyController {
  @Get()
  findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log(keyword, page, pageSize);
    return {
      list: [1, 2, 3],
      count: 100,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id, test: 'test' };
  }
}
