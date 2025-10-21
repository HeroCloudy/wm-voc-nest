import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
