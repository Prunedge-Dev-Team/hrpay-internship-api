import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  role: UserRoleEnum;
}
