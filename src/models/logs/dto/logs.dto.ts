import { IsNotEmpty, IsNumber, IsPositive, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

import { MachineDTO } from '../../machines/dto/machine.dto';

export class LogDTO {
  @IsNotEmpty()
  @Type(() => MachineDTO)
  @ValidateNested()
  readonly machine: MachineDTO;

  @IsNotEmpty()
  @IsDateString()
  readonly datetime: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly imagesCount: number;
}
