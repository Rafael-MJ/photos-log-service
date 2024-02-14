import { BadRequestException, Injectable } from '@nestjs/common';

import { Establishment } from '../../establishments/interfaces/establishment.interface';
import { MachineDTO } from '../../machines/dto/machines.dto';
import { Machine } from '../../machines/interfaces/machine.interface';
import { MachineRepository } from '../machine.repository';
import { EstablishmentsService } from '../../establishments/services/establishments.service';

@Injectable()
export class MachinesService {
  constructor(
    private readonly machineRepository: MachineRepository,
    private readonly establishmentsService: EstablishmentsService,
  ) {}

  async getAllMachines(): Promise<Machine[]> {
    const allMachines = await this.machineRepository.getAllMachines();

    if (!allMachines.length) throw new BadRequestException('There are no registers for machines');

    return allMachines;
  }

  async saveMachine(newMachine: MachineDTO): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(newMachine.name);

    if (!existMachine) {
      await this.establishmentsService.getEstablishmentById(newMachine.currentEstablishmentId);

      return await this.machineRepository.saveMachine(newMachine);
    }

    throw new BadRequestException('This machine already exists');
  }

  async getMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(machineName);

    if (!existMachine) throw new BadRequestException('There are no results for this machine name');

    return existMachine;
  }

  async getMachineById(machineId: Machine): Promise<Machine> {
    try {
      const existMachine = await this.machineRepository.getMachineById(machineId);

      if (!existMachine) throw new BadRequestException('There are no results for this machine ID');

      return existMachine;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMachineByName(machineName: string, newMachine: MachineDTO): Promise<Machine> {
    try {
      const existMachine = await this.machineRepository.getMachineByName(machineName);

      if (!existMachine) throw new BadRequestException('There are no results for this machine');

      await this.machineRepository.updateMachineByName(machineName, newMachine);

      return await this.getMachineByName(newMachine.name);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.deleteMachineByName(machineName);

    if (!existMachine) throw new BadRequestException('This machine does not exist');

    return existMachine;
  }

  async getMachinesByEstablishment(establishment: Establishment): Promise<Machine[]> {
    try {
      const foundMachines = await this.machineRepository.getMachinesByEstablishment(establishment);

      if (!foundMachines.length)
        throw new BadRequestException('There are no results for this establishment');

      return foundMachines;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
