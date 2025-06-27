import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces/task-status-enum';

export class updateTaskStatusDto {
    @IsString()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
