import { IsString, IsInt } from 'class-validator';
import { isString } from 'util';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
