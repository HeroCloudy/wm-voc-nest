import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Component extends BaseEntity {
  constructor() {
    super();
  }

  @Column()
  fe_id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column({ default: false })
  isHidden: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @Column({ type: 'text' })
  propsText: string;

  props: Record<string, any>;

  @Column({ nullable: false })
  surveyId: string;
}
