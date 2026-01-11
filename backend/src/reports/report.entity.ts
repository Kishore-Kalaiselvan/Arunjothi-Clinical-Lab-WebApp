import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column()
  refBy: string;

  @Column('jsonb')
  tests: any; // selected tests + values

  @Column()
  totalAmount: number;

  @Column({ default: true })
  locked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
