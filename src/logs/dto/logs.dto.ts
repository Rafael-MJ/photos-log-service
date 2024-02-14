import * as validator from 'class-validator';
import { Machine } from '../../machines/interfaces/machine.interface';

export class LogDTO {
  @validator.IsNotEmpty()
  @validator.IsMongoId()
  readonly machineId: Machine;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly usedPaperCount: number;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly usedPrinterInk: number;

  @validator.IsNotEmpty()
  @validator.IsDateString()
  readonly datetime: Date;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly printedImagesCount: number;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly establishment: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly city: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 2)
  readonly province: string;
}
