import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({status: 201, description: `The user was created`})
  @ApiResponse({status: 400, description: `Missing required fields in the requisiton body`})
  @ApiResponse({status: 409, description: `The e-mail already exists in the database`})
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email) {
        throw new HttpException(`Missing field on request body: email`, HttpStatus.BAD_REQUEST)
      }
      if (!createUserDto.password) {
        throw new HttpException(`Missing field on request body: password`, HttpStatus.BAD_REQUEST)
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

  @ApiResponse({status: 200, description: `Success`})
  @ApiResponse({status: 404, description: `There is no user with given id in the database`})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id)
      if (!user) {
        throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
      }
      return user
    } catch (error) {
      throw error
    }
  }

  @ApiResponse({status: 200, description: `Success`})
  @ApiResponse({status: 404, description: `There is no user with given email in the database`})
  @Get('/findByEmail/:email')
  async findByEmail(@Param('email') email: string) {
     try {
        const user = await this.userService.findByEmail(email)
        if (!user) {
          throw new HttpException(`There is no user with given email ${email} in the database`, HttpStatus.NOT_FOUND)
        }
        return user
     } catch (error) {
          throw error
     }
  }

  @ApiResponse({status: 200, description: `Successfully updated user`})
  @ApiResponse({status: 404, description: `There is no user with given id in the database`})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
    }
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiResponse({status: 200, description: `Successfully deleted user`})
  @ApiResponse({status: 404, description: `There is no user with given id in the database`})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(+id)
    if (!user) {
      throw new HttpException(`No user found for the id ${id}`, HttpStatus.NOT_FOUND)
    }
    return await this.userService.remove(+id);
  }
}
