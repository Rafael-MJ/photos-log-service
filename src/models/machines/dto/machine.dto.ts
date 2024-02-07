import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class MachineDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly establishment: string;

  @IsNumber()
  @IsPositive()
  readonly localMachineNumber: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly currentCity: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  readonly currentProvince: string;
}
