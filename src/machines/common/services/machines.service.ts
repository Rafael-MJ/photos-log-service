import { BadRequestException, Injectable } from '@nestjs/common';

import { MachineRepository } from '../../machine.repository';
import { MachineDTO } from '../../dto/machines.dto';
import { Machine } from '../../interfaces/machine.interface';

@Injectable()
export class MachinesCommonService {
  constructor(private readonly machineRepository: MachineRepository) {}

  async existsMachineByName(machineName: string): Promise<boolean> {
    const existMachine = await this.machineRepository.getMachineByName(machineName);

    if (!existMachine) return false;
    else return true;
  }

  async getMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(machineName);

    if (!existMachine) throw new BadRequestException('There are no results');

    return existMachine;
  }

  async updateMachineByName(machineName: string, newMachine: MachineDTO): Promise<Machine> {
    try {
      const existMachine = await this.machineRepository.getMachineByName(machineName);

      if (!existMachine) throw new BadRequestException('There are no results');

      await this.machineRepository.updateMachineByName(machineName, newMachine);

      return await this.getMachineByName(newMachine.name);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
