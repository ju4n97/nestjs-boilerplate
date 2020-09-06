import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 25 })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 100 })
  email: string;
}
