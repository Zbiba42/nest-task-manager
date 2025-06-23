import { IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces/Task';

export class updateTaskStatusDto {
    @IsString()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
