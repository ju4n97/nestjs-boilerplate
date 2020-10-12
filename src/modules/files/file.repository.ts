import { EntityRepository, Repository } from 'typeorm';
import { FileEntity } from './file.entity';

@EntityRepository(FileEntity)
export class FileRepository extends Repository<FileEntity> {}
