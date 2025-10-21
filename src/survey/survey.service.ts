import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
  ) {}

  async create(username: string) {
    const survey = new Survey();
    survey.title = '问卷标题' + `${new Date().getTime()}`;
    survey.desc = '问卷描述信息...';
    survey.author = username;
    await this.surveyRepository.insert(survey);
    return survey.id;
  }

  async findPage({ keyword = '', page = 1, pageSize = 10 }) {
    const [list, total] = await this.surveyRepository.findAndCount({
      where: [{ title: Like(`%${keyword}%`) }, { desc: Like(`%${keyword}%`) }],
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      list,
      total,
    };
  }

  findOne(id: string) {
    return this.surveyRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.surveyRepository.delete(id);
  }

  update(id: string, updateData: Partial<Survey>) {
    return this.surveyRepository.update(id, updateData);
  }
}
