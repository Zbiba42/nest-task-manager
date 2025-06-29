import { IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces/task-status-enum';

export class filterTaskDto {
  @IsString()
  @IsOptional()
  status: TaskStatus;

  @IsString()
  @IsOptional()
  search: string;
}
