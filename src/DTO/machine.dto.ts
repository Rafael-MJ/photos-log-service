import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MachineDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly name: string;
}
