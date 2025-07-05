import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignUpCredentialsDto } from './dtos/signup-credentials';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dtos/signin-credential';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) { }

  async signUp(dto: SignUpCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(dto);
  }

  async signIn(dto: SignInCredentialsDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = dto;
    const user = await this.usersRepository.findOneBy({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, fullName: user.fullName, email: user.email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'an account with these credentials does not exist',
      );
    }
  }

  async getProfile(user: User): Promise<User> {
    const { password, ...userProfile } = user;
    return userProfile as User;
  }

  async updateProfile(user: User, dto: UpdateProfileDto): Promise<User> {
    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.usersRepository.findOneBy({ email: dto.email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      user.email = dto.email;
    }

    if (dto.fullName) {
      user.fullName = dto.fullName;
    }

    return await this.usersRepository.save(user);
  }

  async updatePassword(user: User, dto: UpdatePasswordDto): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = dto;

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirmation do not match');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await this.usersRepository.save(user);
  }
}
