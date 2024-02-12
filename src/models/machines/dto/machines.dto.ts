import { IsNotEmpty, IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class MachineDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly paperStock: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly inkStock: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly currentEstablishment: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly currentCity: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  readonly currentProvince: string;

  @IsNumber()
  @IsPositive()
  readonly currentLocalMachineNumber: number;
}
