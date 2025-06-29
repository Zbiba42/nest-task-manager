import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpCredentialsDto } from './dtos/signup-credentials';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(dto: SignUpCredentialsDto): Promise<void> {
    const { fullName, email, password } = dto;
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.save(
        this.create({
          fullName: fullName,
          email: email,
          password: hashedPassword,
        }),
      );
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
