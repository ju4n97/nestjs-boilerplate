import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleStatus } from './enums';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: RoleStatus.Active,
  })
  status: RoleStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  //   @ManyToMany(() => PermissionEntity, { eager: true })
  //   @JoinTable({
  //     name: 'role_permission',
  //     joinColumn: { name: 'role_id', referencedColumnName: 'id' },
  //     inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  //   })
  //   permissions: PermissionEntity[];

  @BeforeInsert()
  async normalizeRole(): Promise<void> {
    this.name = this.name.toUpperCase();
  }
}
