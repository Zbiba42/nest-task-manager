import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TaskStatus } from './interfaces/task-status-enum';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { createTaskDto } from './dtos/createTaskDto';
import { filterTaskDto } from './dtos/filterTaskDto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TasksRepository) { }

  getTasks(dto: filterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(dto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
        user: { id: user.id }
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  createTask(dto: createTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(dto, user);
  }

  async updateStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.status = status;

    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, user: { id: user.id } });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
