import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileGroup } from './enums';

@Entity('file')
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'original_name', type: 'text', nullable: false })
  originalName: string;

  @Column({ name: 'mime_type', type: 'text', nullable: false })
  mimeType: string;

  @Column({ name: 'destination', type: 'varchar', length: 50, nullable: false })
  destination: string;

  @Column({ name: 'file_name', type: 'text', nullable: false })
  fileName: string;

  @Column({ name: 'path', type: 'text', nullable: false })
  path: string;

  @Column({ name: 'size', type: 'int', nullable: false })
  size: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  group: FileGroup;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
