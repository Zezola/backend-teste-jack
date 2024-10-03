import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.taskService.create(createTaskDto);
    } catch (error) {
      throw new HttpException(`Arguments are missing in the body`, HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    try {
      return await this.taskService.findAll();
    } catch (error) {
      throw new HttpException(`Resource not found. Check your endpoint`, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('tasksByUser/:userId')
  @UseGuards(AuthGuard)
  async findByUserId(@Param('userId') userId : string) {
      try {
        const user = await this.userService.findOne(+userId)
        return await this.taskService.findByUserId(userId);
      } catch (error) {
        throw new HttpException(`No user with id ${userId} found`, HttpStatus.NOT_FOUND)
      }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    try {
       const task = await this.taskService.findOne(+id);
       if (!task) {
        throw new Error // TODO: Provavelmente tem um jeito menos burro de fazer isso. esse if é direcionar pra cair no CATCH Talvez nem precise de try-catch
       }
       return await this.taskService.findOne(+id);
    } catch (error) {
      throw new HttpException(`No task with id ${id} found`, HttpStatus.NOT_FOUND)
    }    
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.findOne(+id)
    if (!task) {
      throw new HttpException(`No task with given id ${id}`, HttpStatus.NOT_FOUND)
    }
    const taskUpdated = await this.taskService.update(+id, updateTaskDto);    
  }
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const task = await this.taskService.findOne(+id)
    if (!task) {
      throw new HttpException(`No task with id ${id}`, HttpStatus.NOT_FOUND)
    }
    return this.taskService.remove(+id);
  }
}
