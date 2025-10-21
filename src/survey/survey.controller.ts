import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';

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

  @Post()
  create(@Request() req: any) {
    const { username = '' } = req.user;
    return this.surveyService.create(username);
  }

  @Get()
  findAll(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.surveyService.findPage({
      keyword,
      page,
      pageSize,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.surveyService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Survey>) {
    return this.surveyService.update(id, updateData);
  }
}
