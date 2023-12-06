import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class TransformUserDto implements PipeTransform<CreateUserDto | UpdateUserDto> {
  transform(value: CreateUserDto) {
    const newValue = this.convertToLowerCase(value, ['password']);

    return newValue;
  }

  convertToLowerCase(obj: CreateUserDto, excludedKeys: string[]) {
    const newObj = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const isExcluded = excludedKeys.includes(key) || typeof obj[key] !== 'string';
        newObj[key] = isExcluded ? obj[key] : String(obj[key]).toLowerCase();
      }
    }

    return newObj;
  }
}
