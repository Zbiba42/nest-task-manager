import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
