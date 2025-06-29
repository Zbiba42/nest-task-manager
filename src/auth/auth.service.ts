import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignUpCredentialsDto } from './dtos/signup-credentials';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dtos/signin-credential';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(dto);
  }

  async signIn(dto: SignInCredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = dto;
    const user = await this.usersRepository.findOneBy({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { fullName: user.fullName, email: user.email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'an account with these credentials does not exist',
      );
    }
  }
}
