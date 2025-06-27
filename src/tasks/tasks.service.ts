import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './interfaces/task-status-enum';
import { stat } from 'fs';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dtos/createTaskDto';
import { filterTaskDto } from './dtos/filterTaskDto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: TasksRepository
    ) { }

    getTasks(dto: filterTaskDto): Promise<Task[]> {
        return this.taskRepository.getTasks(dto);
    }


    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: {
                id: id,
            },
        })

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task
    }

    createTask(dto: createTaskDto): Promise<Task> {
        return this.taskRepository.createTask(dto)
    }

    async updateStatus(id: string, status: TaskStatus): Promise<Task> {
        let task = await this.getTaskById(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.status = status

        await this.taskRepository.save(task);

        return task;
    }


    async deleteTask(id: string): Promise<void> {
        const results = await this.taskRepository.delete(id);

        if (results.affected == 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }
}
