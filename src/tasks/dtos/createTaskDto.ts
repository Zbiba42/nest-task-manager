import { IsNotEmpty, IsString } from 'class-validator';

export class createTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
