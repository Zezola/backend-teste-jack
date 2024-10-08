import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, UserService],
})
export class TaskModule {}
