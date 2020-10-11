import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PermissionRepository } from './permission.repository';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository]), AuthModule],
  providers: [PermissionsService, Logger],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
