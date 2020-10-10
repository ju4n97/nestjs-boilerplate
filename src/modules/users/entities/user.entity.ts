import { hash } from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDetailEntity } from './user-detail.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    name: 'password_reset_token',
    type: 'varchar',
    nullable: true,
  })
  passwordResetToken: string;

  @Column({
    name: 'password_reset_token_expire',
    type: 'timestamp',
    nullable: true,
  })
  passwordResetTokenExpire: Date;

  @Column({ type: 'varchar', unique: true, length: 60, nullable: false })
  email: string;

  @Column({
    name: 'email_confirmed',
    type: 'boolean',
    default: 0,
    nullable: false,
  })
  emailConfirmed: boolean;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'phone_number_confirmed',
    type: 'boolean',
    default: 0,
    nullable: false,
  })
  phoneNumberConfirmed: boolean;

  @Column({
    name: 'two_factor_enabled',
    type: 'boolean',
    default: 0,
    nullable: false,
  })
  twoFactorEnabled: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToOne(
    () => UserDetailEntity,
    details => details.user,
    {
      nullable: false,
      eager: true,
      cascade: true,
    },
  )
  details: UserDetailEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
