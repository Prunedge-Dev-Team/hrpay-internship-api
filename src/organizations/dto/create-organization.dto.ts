import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
}
