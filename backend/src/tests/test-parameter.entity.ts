import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class TestParameter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Test, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'test_id' })
  test: Test;

  @Column()
  name: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  referenceRange: string;

  @Column()
  displayOrder: number;
}
