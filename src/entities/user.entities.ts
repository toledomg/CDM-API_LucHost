import { getRounds, hashSync } from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Contact } from './contacts.entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'varchar', length: 11 })
  phone: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: string;

  @UpdateDateColumn({ type: 'date' })
  updatedAt: string;

  @DeleteDateColumn({ type: 'date' })
  deletedAt: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = getRounds(this.password);

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
