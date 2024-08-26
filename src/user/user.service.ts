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
    return this.prismaService.user.create({data: createUserDto})
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({where: {
      id: id
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
    return this.prismaService.user.update({
      where: {
        id: id
      }, data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prismaService.user.delete({where: {id: id}})
  }
}
