import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  private salt = this.configService.getOrThrow('SALT');

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const exists = await this.prisma.user.findUnique({ where: { email } });
    if (exists) {
      throw new ConflictException({ email: 'Email already exist' });
    }

    createUserDto.password = await bcrypt.hash(password, this.salt);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
