import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Survey } from './survey.entity';
import { In, Like, Repository } from 'typeorm';
import { Component } from './component.entity';
import { SurveyRespDto } from './dto/survey-resp.dto';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
  ) {}

  async create(username: string) {
    const survey = new Survey();
    survey.title = '问卷标题' + `${new Date().getTime()}`;
    survey.desc = '问卷描述信息...';
    survey.author = username;
    await this.surveyRepository.insert(survey);
    return survey.id;
  }

  async findPage({
    keyword = '',
    page = 1,
    pageSize = 10,
    author = '',
    isDeleted = false,
    isStar,
  }) {
    const whereOpt: FindOptionsWhere<Survey> = {
      title: Like(`%${keyword}%`),
      author,
      isDeleted,
    };
    if (isStar !== null && isStar !== undefined) {
      whereOpt.isStar = isStar;
    }
    const [list, total] = await this.surveyRepository.findAndCount({
      where: whereOpt,
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

  async findOne(id: string) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) {
      throw new NotFoundException('未查询到问卷信息');
    }
    const list = await this.componentRepository.findBy({ surveyId: id });
    return new SurveyRespDto(survey, list);
  }

  async remove(id: string, author: string) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) {
      throw new NotFoundException('删除的问卷id不存在');
    }
    if (author !== survey.author) {
      throw new NotFoundException('只能本人创建的问卷');
    }
    return this.surveyRepository.update(id, { isDeleted: true });
  }

  async update(id: string, updateData: Partial<SurveyRespDto>) {
    await this.surveyRepository.update(id, updateData);
    const { componentList = [] } = updateData;
    await this.componentRepository.delete({ surveyId: id });
    const newList = componentList.map((item) => {
      return {
        ...item,
        propsText: JSON.stringify(item.props),
        surveyId: id,
      };
    });
    await this.componentRepository.save(newList);
    return;
  }

  async batchRemove(ids: string[]) {
    await this.surveyRepository.delete({
      id: In(ids),
    });
    await this.componentRepository.delete({
      surveyId: In(ids),
    });
  }
}
