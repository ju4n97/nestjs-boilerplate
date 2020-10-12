import { Exclude } from 'class-transformer';
import { FileGroup } from '../enums';
import { FileDto } from './file.dto';

@Exclude()
export class CreateFileDto extends FileDto {
  assign?(file: Express.Multer.File, fileGroup: FileGroup): void {
    this.fileName = file.filename;
    this.destination = file.destination;
    this.mimeType = file.mimetype;
    this.originalName = file.originalname;
    this.path = file.path;
    this.size = file.size;
    this.group = fileGroup;
  }
}
