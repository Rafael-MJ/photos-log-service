import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { Establishment } from '../../establishment/interfaces/establishment.interface';
import { MachineDTO } from '../dto/machine.dto';
import { Machine } from '../interfaces/machine.interface';
import { MachineRepository } from '../machine.repository';
import { EstablishmentService } from '../../establishment/services/establishment.service';

@Injectable()
export class MachineService {
  constructor(
    private readonly machineRepository: MachineRepository,
    private readonly establishmentsService: EstablishmentService,
  ) {}

  async getAllMachines(): Promise<Machine[]> {
    const allMachines = await this.machineRepository.getAllMachines();

    if (!allMachines.length) {
      throw new NotFoundException('There are no registers for machines');
    } else {
      return allMachines;
    }
  }

  async saveMachine(newMachine: MachineDTO): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(newMachine.name);

    if (!existMachine) {
      await this.establishmentsService.getEstablishmentById(newMachine.currentEstablishmentId);

      return await this.machineRepository.saveMachine(newMachine);
    } else {
      throw new ConflictException('This machine already exists');
    }
  }

  async getMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.getMachineByName(machineName);

    if (!existMachine) {
      throw new NotFoundException('There are no results for this machine name');
    } else {
      return existMachine;
    }
  }

  async getMachineById(machineId: Machine): Promise<Machine> {
    try {
      const existMachine = await this.machineRepository.getMachineById(machineId);

      if (!existMachine) {
        throw new NotFoundException('There are no results for this machine ID');
      } else {
        return existMachine;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateMachineByName(machineName: string, newMachine: MachineDTO): Promise<Machine> {
    try {
      const existMachine = await this.machineRepository.getMachineByName(machineName);

      if (!existMachine) {
        throw new NotFoundException('There are no results for this machine');
      } else {
        await this.machineRepository.updateMachineByName(machineName, newMachine);

        return await this.getMachineByName(newMachine.name);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteMachineByName(machineName: string): Promise<Machine> {
    const existMachine = await this.machineRepository.deleteMachineByName(machineName);

    if (!existMachine) {
      throw new NotFoundException('This machine does not exist');
    } else {
      return existMachine;
    }
  }

  async getMachinesByEstablishment(establishment: Establishment): Promise<Machine[]> {
    try {
      const foundMachines = await this.machineRepository.getMachinesByEstablishment(establishment);

      if (!foundMachines.length) {
        throw new NotFoundException('There are no results for this establishment');
      } else {
        return foundMachines;
      }
    } catch (error) {
      throw error;
    }
  }
}
