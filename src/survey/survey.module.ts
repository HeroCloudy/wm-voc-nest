import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Component } from './component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Component])],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
