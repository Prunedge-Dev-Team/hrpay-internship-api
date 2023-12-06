import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ConfigService],
})
export class UsersModule {}
