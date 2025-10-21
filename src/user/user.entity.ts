import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();
  }
  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  nickname: string;
}
