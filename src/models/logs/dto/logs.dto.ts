import { IsNotEmpty, IsNumber, IsPositive, IsDateString, IsString, Length } from 'class-validator';

export class LogDTO {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly machineName: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly usedPaper: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly usedInk: number;

  @IsNotEmpty()
  @IsDateString()
  readonly datetime: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly printedImagesCount: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly establishment: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  readonly province: string;

  @IsNumber()
  @IsPositive()
  readonly localMachineNumber: number;
}
