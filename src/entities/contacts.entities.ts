import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entities';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 240 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: 'CASCADE' })
  user: User;
}
