import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
import { PrismaConfig } from 'src/config/config.interface';

@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<PrismaConfig>('prisma');

        return {
          prismaOptions: {
            log: config.log,
            datasources: {
              db: {
                url: configService.get('DATABASE_URL'),
              },
            },
          },
          explicitConnect: config.explicitConnect,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class PrismaProviderModule {}
