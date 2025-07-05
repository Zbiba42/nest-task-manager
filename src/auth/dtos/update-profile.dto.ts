import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(2, { message: 'Full name must be at least 2 characters long' })
    fullName?: string;

    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email?: string;
} 