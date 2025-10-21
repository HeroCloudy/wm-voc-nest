import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async create(survey: Partial<Survey>) {
    survey.id = undefined;
    await this.surveyRepository.insert(survey);
    return survey.id;
  }

  findAll() {
    return this.surveyRepository.find({});
  }

  findOne(id: number) {
    return this.surveyRepository.findOneBy({ id });
  }
}
