import { forwardRef, Logger, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => AuthModule),
    MulterModule.register(),
    FilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
