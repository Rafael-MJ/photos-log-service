import { BadRequestException, Injectable } from '@nestjs/common';

import { MachineDTO } from 'src/models/machines/dto/machines.dto';
import { Machine } from 'src/models/machines/interfaces/machine.interface';
import { MachineRepository } from '../machine.repository';

@Injectable()
export class MachinesService {
  constructor(private readonly machineRepository: MachineRepository) {}

  async getAllMachines(): Promise<Machine[]> {
    const allMachines = await this.machineRepository.getAllMachines();

    if (!allMachines.length) throw new BadRequestException('There are no registers');

    return allMachines;
  }

  async saveMachine(newMachine: MachineDTO): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(newMachine.name);

    if (!existMachine) return await this.machineRepository.saveMachine(newMachine);

    throw new BadRequestException('Machine already exists');
  }

  async deleteMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.deleteMachineByName(machineName);

    if (!existMachine) throw new BadRequestException('This machine does not exist');

    return existMachine;
  }

  async getMachinesByEstablishment(establishment: string): Promise<Machine[]> {
    const foundMachines = await this.machineRepository.getMachinesByEstablishment(establishment);

    if (!foundMachines.length)
      throw new BadRequestException('There are no results for this establishment');

    return foundMachines;
  }
}
