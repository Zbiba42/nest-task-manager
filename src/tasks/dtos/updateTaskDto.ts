import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces/task-status-enum';

export class updateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
} 