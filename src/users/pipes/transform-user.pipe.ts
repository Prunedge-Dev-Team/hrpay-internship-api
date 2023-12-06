import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

type T = CreateUserDto | UpdateUserDto;
@Injectable()
export class TransformUserDto implements PipeTransform<T> {
  transform(value: T) {
    const newValue = this.convertToLowerCase(value, ['password']);

    return newValue;
  }

  convertToLowerCase(obj: T, excludedKeys: string[]) {
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
