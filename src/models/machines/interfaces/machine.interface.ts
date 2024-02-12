export interface Machine extends Document {
  readonly name: string;
  readonly paperStock: number;
  readonly inkStock: number;
  readonly currentEstablishment: string;
  readonly currentCity: string;
  readonly currentProvince: string;
  readonly currentLocalMachineNumber: number;
}
