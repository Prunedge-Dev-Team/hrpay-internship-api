import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

type T = CreateUserDto & UpdateUserDto;

@Injectable()
export class TransformUserDto implements PipeTransform<T> {
  transform(value: CreateUserDto) {
    const newValue = { ...value, email: value.email.trim().toLowerCase() };
    return newValue;
  }
}
