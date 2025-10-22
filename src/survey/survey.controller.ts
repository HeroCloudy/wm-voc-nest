import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './survey.entity';
import { SurveyRespDto } from './dto/survey-resp.dto';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

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
    @Query('isDeleted') isDeleted: boolean = false,
    @Query('isStar') isStar: boolean,
    @Req() req: any,
  ) {
    const { username = '' } = req.user;
    return this.surveyService.findPage({
      keyword,
      page,
      pageSize,
      author: username,
      isDeleted,
      isStar,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveyService.findOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string, @Req() req: any) {
    const { username = '' } = req.user;
    return this.surveyService.remove(id, username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<SurveyRespDto>) {
    return this.surveyService.update(id, updateData);
  }

  @Delete('batch')
  async deleteBatch(@Body() body: { ids: string[] }) {
    const { ids = [] } = body;
    await this.surveyService.batchRemove(ids);
    return;
  }

  @Post('copy/:id')
  async copy(@Param('id') id: string, @Req() req: any) {
    const { username = '' } = req.user;
    return this.surveyService.copy(id, username);
  }
}
