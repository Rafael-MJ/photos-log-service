import * as validator from 'class-validator';

export class EstablishmentDTO {
  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly name: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 75)
  readonly address: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 50)
  readonly city: string;

  @validator.IsNotEmpty()
  @validator.IsString()
  @validator.Length(2, 2)
  readonly state: string;
}
