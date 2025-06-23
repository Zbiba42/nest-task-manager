import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { createTaskDto } from './dtos/createTaskDto';
import { updateTaskStatusDto } from './dtos/updateTaskStatusDto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() dto: createTaskDto) {
        return this.tasksService.createTask(dto.title, dto.description)
    }

    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() dto: updateTaskStatusDto) {
        return this.tasksService.updateStatus(id, dto.status)
    }

    @Delete()
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id)
    }
}
