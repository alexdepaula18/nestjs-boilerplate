import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    try {
      return await this.find({
        order: {
          id: 'ASC',
        },
        take: limit,
        skip: offset,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao consultar o usuários no banco de dados',
      );
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.findOne(id);
    } catch (error) {
      if (error.code.toString() === '22P02') {
        throw new NotFoundException('Usuário não encontrado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao consultar o usuário no banco de dados',
        );
      }
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findById(id);
      return user;
    } catch (error) {
      if (error.code.toString() === '22P02') {
        throw new NotFoundException('Usuário não encontrado');
      } else {
        throw new InternalServerErrorException(
          'Erro ao consultar o usuário no banco de dados',
        );
      }
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
