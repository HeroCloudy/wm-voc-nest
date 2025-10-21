import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { TwitterSnowflake } from '@sapphire/snowflake';

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string = `${TwitterSnowflake.generate()}`;

  @CreateDateColumn()
  createdTime: Date;

  @UpdateDateColumn()
  updatedTime: Date;
}
