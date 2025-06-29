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
  getAllTasks(@Query() dto: filterTaskDto): Promise<Task[]> {
    return this.tasksService.getTasks(dto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: createTaskDto, @GetUser() user: User): Promise<Task> {
    return this.tasksService.createTask(dto, user);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: updateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateStatus(id, dto.status);
  }

  @Delete()
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
