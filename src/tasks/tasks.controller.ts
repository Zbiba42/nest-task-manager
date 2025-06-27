import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dtos/createTaskDto';
import { updateTaskStatusDto } from './dtos/updateTaskStatusDto';
import { Task } from './task.entity';
import { filterTaskDto } from './dtos/filterTaskDto';

@Controller('tasks')
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
    createTask(@Body() dto: createTaskDto): Promise<Task> {
        return this.tasksService.createTask(dto)
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: updateTaskStatusDto): Promise<Task> {
        return this.tasksService.updateStatus(id, dto.status)
    }

    @Delete()
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id)
    }
}
