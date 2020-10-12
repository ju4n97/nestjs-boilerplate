import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { unlinkSync } from 'fs';
import { CreateFileDto, GetFileDto } from './dto';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FilesService {
  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('FilesService');
  }

  async create(createFileDto: CreateFileDto): Promise<FileEntity> {
    this._logger.log(`Request to create a file`);
    const file = this._fileRepository.create(createFileDto);
    await file.save();
    return file;
  }

  async delete(id: string): Promise<GetFileDto> {
    this._logger.log(`Request to delete a file by id "${id}".`);
    const file = await this._fileRepository.findOne(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this._fileRepository.delete(id);
    unlinkSync(file.path);
    return plainToClass(GetFileDto, file);
  }
}
