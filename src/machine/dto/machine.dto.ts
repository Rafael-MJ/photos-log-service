import * as validator from 'class-validator';
import { Establishment } from '../../establishment/interfaces/establishment.interface';

export class MachineDTO {
  @validator.IsNotEmpty()
  @validator.IsMongoId()
  readonly currentEstablishmentId: Establishment;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly name: string;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.Min(0)
  readonly paperStock: number;

  @validator.IsNotEmpty()
  @validator.IsNumber()
  @validator.Min(0)
  readonly printerInkStock: number;
}
