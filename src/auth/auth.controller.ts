import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dtos/signup-credentials';
import { SignInCredentialsDto } from './dtos/signin-credential';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  signIn(@Body() dto: SignInCredentialsDto): Promise<{
    accessToken: string;
  }> {
    return this.authService.signIn(dto);
  }
}
