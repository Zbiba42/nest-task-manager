import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './interfaces/Task';
import { v4 as uuid } from 'uuid'
import { stat } from 'fs';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task | undefined {
        const task = this.tasks.find((task) => {
            return task.id == id
        })
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    createTask(title: string, description: string) {
        const task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    updateStatus(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        task.status = status

        return task;
    }


    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => {
            return task.id !== id
        })
    }
}
