import { hash } from 'bcrypt';
import { FileEntity } from 'src/modules/files/file.entity';
import { RoleEntity } from 'src/modules/roles/role.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../enums';
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

  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
    default: UserStatus.Active,
  })
  status: UserStatus;

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

  @ManyToMany(() => RoleEntity, { eager: true })
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  @ManyToMany(() => FileEntity, {
    nullable: true,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user_file',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' },
  })
  files: FileEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
