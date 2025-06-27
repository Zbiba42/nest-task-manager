import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { createTaskDto } from "./dtos/createTaskDto";
import { TaskStatus } from "./interfaces/task-status-enum";
import { filterTaskDto } from "./dtos/filterTaskDto";


export class TasksRepository extends Repository<Task> {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }

    async getTasks(dto: filterTaskDto): Promise<Task[]> {
        const { status, search } = dto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` }
            );
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(dto: createTaskDto): Promise<Task> {
        const { title, description } = dto;

        const task = this.create({
            title: title,
            description: description,
            status: TaskStatus.OPEN
        });

        await this.save(task)

        return task;
    }
}