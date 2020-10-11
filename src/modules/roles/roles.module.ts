import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from './role.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), AuthModule],
  controllers: [RolesController],
  providers: [RolesService, Logger],
})
export class RolesModule {}
