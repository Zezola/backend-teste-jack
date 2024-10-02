import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService : PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.prismaService.task.create({data: createTaskDto})
  }

  async findAll() {
    return await this.prismaService.task.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({where: {
      id: id
    }});
  }

  async findByUserId(userId: string ) {
    return await this.prismaService.task.findMany({where: {
      userId: parseInt(userId)
    }})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.prismaService.task.update({
      where: {id: id},
      data: updateTaskDto
    });
  }

  async remove(id: number) {
    return await this.prismaService.task.delete({where: {
      id: id
    }});
  }
}
