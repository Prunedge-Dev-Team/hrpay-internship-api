import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { CreateOrganizationDto } from '../dto/create-organization.dto';

type T = CreateOrganizationDto | UpdateOrganizationDto;

@Injectable()
export class TransformOrgDto implements PipeTransform<T> {
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
