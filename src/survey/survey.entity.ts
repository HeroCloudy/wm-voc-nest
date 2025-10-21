import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Survey extends BaseEntity {
  constructor() {
    super();
  }
  @Column()
  title: string;

  @Column()
  desc: string;
}
