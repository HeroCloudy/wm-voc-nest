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

  @Column({ nullable: true, default: '' })
  js: string;

  @Column({ nullable: true, default: '' })
  css: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: false })
  isStar: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: false })
  author: string;
}
