import * as validator from 'class-validator';
import { Machine } from '../../machine/interfaces/machine.interface';
import { Establishment } from '../../establishment/interfaces/establishment.interface';

export class LogDTO {
  @validator.IsNotEmpty()
  @validator.IsMongoId()
  readonly machineId: Machine;

  @validator.IsEmpty()
  readonly establishmentId: Establishment;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly usedPaperCount: number;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly usedPrinterInk: number;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.IsPositive()
  readonly printedImagesCount: number;

  @validator.IsNotEmpty()
  @validator.IsDateString()
  readonly datetime: Date;
}
