import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService : PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({data: createTaskDto})
  }

  findAll() {
    return this.prismaService.task.findMany();
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({where: {
      id: id
    }});
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: {id: id},
      data: updateTaskDto
    });
  }

  remove(id: number) {
    return this.prismaService.task.delete({where: {
      id: id
    }});
  }
}
