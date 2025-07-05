import { IsString, MinLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    currentPassword: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
    })
    newPassword: string;

    @IsString()
    confirmPassword: string;
} 