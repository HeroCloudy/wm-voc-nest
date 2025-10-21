import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;
}
