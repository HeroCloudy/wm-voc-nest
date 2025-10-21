import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}
  //
  // @Get()
  // findAll(
  //   @Query('keyword') keyword: string,
  //   @Query('page') page: number,
  //   @Query('pageSize') pageSize: number,
  // ) {
  //   console.log(keyword, page, pageSize);
  //   return {
  //     list: [1, 2, 3],
  //     count: 100,
  //   };
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   throw new HttpException('获取数据失败', HttpStatus.BAD_REQUEST);
  //   // return { id, test: 'test' };
  // }

  @Post()
  create(@Body() survey: Partial<Survey>) {
    return this.surveyService.create(survey);
  }

  @Get()
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.surveyService.findOne(id);
  }
}
