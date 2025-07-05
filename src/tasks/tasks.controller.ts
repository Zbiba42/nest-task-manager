import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dtos/createTaskDto';
import { updateTaskDto } from './dtos/updateTaskDto';
import { updateTaskStatusDto } from './dtos/updateTaskStatusDto';
import { Task } from './task.entity';
import { filterTaskDto } from './dtos/filterTaskDto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getAllTasks(@Query() dto: filterTaskDto, @GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(dto, user);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(@Body() dto: createTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(dto, user);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() dto: updateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTask(id, dto, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: updateTaskStatusDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, dto.status, user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
