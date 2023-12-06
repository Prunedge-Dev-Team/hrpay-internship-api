import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrganizationsService {
  constructor(
    private configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  private salt = this.configService.getOrThrow('SALT');

  async create(createOrganizationDto: CreateOrganizationDto) {
    const { email, password } = createOrganizationDto;
    const exist = await this.prisma.organization.findUnique({
      where: { email },
    });
    if (exist) {
      throw new ConflictException({
        email: 'Organization with email already exists',
      });
    }

    createOrganizationDto.password = await bcrypt.hash(password, this.salt);

    return this.prisma.organization.create({ data: createOrganizationDto });
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException(`Org with ${id} not found`);
    }

    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: string) {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException(`Org with ${id} not found`);
    }
    return this.prisma.organization.delete({ where: { id } });
  }
}
