import * as validator from 'class-validator';

export class MachineDTO {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly name: string;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly paperStock: number;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly printerInkStock: number;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly currentEstablishment: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly currentCity: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 2)
  readonly currentProvince: string;
}
