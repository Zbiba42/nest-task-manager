import { Body, Controller, Post, Patch, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dtos/signup-credentials';
import { SignInCredentialsDto } from './dtos/signin-credential';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

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

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetUser() user: User): Promise<User> {
    return this.authService.getProfile(user);
  }

  @Patch('/profile')
  @UseGuards(AuthGuard())
  updateProfile(@Body() dto: UpdateProfileDto, @GetUser() user: User): Promise<User> {
    return this.authService.updateProfile(user, dto);
  }

  @Patch('/password')
  @UseGuards(AuthGuard())
  async updatePassword(@Body() dto: UpdatePasswordDto, @GetUser() user: User): Promise<{ message: string }> {
    await this.authService.updatePassword(user, dto);
    return { message: 'Password updated successfully' };
  }
}
