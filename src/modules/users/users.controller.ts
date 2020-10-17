import { customFileName, imageFileFilter } from '@lib/utils/file';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { diskStorage } from 'multer';
import { Auth } from '../auth/guards';
import { CreateFileDto, GetFileDto } from '../files/dto';
import { FileGroup } from '../files/enums';
import { FilesService } from '../files/files.service';
import { Role } from '../roles/enums';
import { User } from './decorators';
import { GetUserDto } from './dto';
import { UsersService } from './users.service';
@Auth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _filesService: FilesService,
  ) {}

  @Auth(Role.SuperUser)
  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return await this._usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<GetUserDto> {
    return await this._usersService.getById(id);
  }

  @Patch('files/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: `uploads/${new Date().getFullYear()}`,
        filename: customFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 2 * 500 * 500, // 500kb,
      },
    }),
  )
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId: string,
  ): Promise<GetFileDto> {
    const createFileDto = new CreateFileDto();
    createFileDto.assign(file, FileGroup.UserAvatar);
    return this._usersService.uploadFile(userId, createFileDto);
  }

  @Patch('files/cover')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: `uploads/${new Date().getFullYear()}`,
        filename: customFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 2 * 500 * 500, // 500kb,
      },
    }),
  )
  uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId: string,
  ): Promise<GetFileDto> {
    const createFileDto = new CreateFileDto();
    createFileDto.assign(file, FileGroup.UserCoverBackground);
    return this._usersService.uploadFile(userId, createFileDto);
  }

  @Delete('files/:fileId')
  async deleteFileById(@Param('fileId') fileId: string): Promise<GetFileDto> {
    return await this._filesService.delete(fileId);
  }
}
