import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new HttpException(`Missing parameters on request body`, HttpStatus.BAD_REQUEST)
      }
      const user = await this.userService.findByEmail(createUserDto.email)
      if (user) {
        throw new HttpException(`Email is already in use`, HttpStatus.CONFLICT)
      }
      return this.userService.create(createUserDto)
    } catch (error) {
      throw error;
    }    
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string) {
     return await this.userService.findByEmail(email)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
    }
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
    }
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(+id)
    if (!user) {
      throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
    }
    return await this.userService.remove(+id);
  }
}
