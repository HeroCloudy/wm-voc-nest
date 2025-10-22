import { Survey } from '../survey.entity';
import { Component } from '../component.entity';

export class SurveyRespDto extends Survey {
  componentList: Component[];

  constructor(survey: Survey, list: Component[]) {
    super();
    Object.assign(this, survey);
    this.componentList = list.map((item) => {
      return {
        ...item,
        props: item.propsText ? JSON.parse(item.propsText) : [],
      };
    });
  }
}
