import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {
  /* Depedency Injection for using the PrismaService */
  constructor (private prismaService : PrismaService) {}

  create(createUserDto: CreateUserDto) {
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

  update(id: number, updateUserDto: UpdateUserDto) {
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
