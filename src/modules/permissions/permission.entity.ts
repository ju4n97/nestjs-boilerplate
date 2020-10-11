import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionGroup, PermissionStatus } from './enums';

@Entity('permission')
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  path: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  icon: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  group: PermissionGroup;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
    default: PermissionStatus.Active,
  })
  status: PermissionStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
