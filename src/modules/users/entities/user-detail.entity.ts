import { toCapitalizedCase, toInitials } from '@lib/utils/text';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_detail')
export class UserDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 25, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 25, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  initials: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(
    () => UserEntity,
    user => user.details,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeNames(): void {
    const { firstName, lastName } = this;

    const extractInitials = () => {
      this.initials = toInitials(firstName, lastName);
    };

    const capitalizeNames = () => {
      this.firstName = toCapitalizedCase(firstName).trim();
      this.lastName = toCapitalizedCase(lastName).trim();
    };

    extractInitials();
    capitalizeNames();
  }
}
