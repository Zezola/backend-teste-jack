import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  /* Depedency Injection for using the PrismaService */
  constructor (private prismaService : PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
    return await this.prismaService.user.create({data: createUserDto})
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({where: {
      id: id
    }})
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({where: {
      email: email
    }})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const saltRounds = 10;
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds
      )
    }
    return await this.prismaService.user.update({
      where: {
        id: id
      }, data: updateUserDto
    })
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({where: {id: id}})
  }
}
