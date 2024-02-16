import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Establishment } from '../establishments/interfaces/establishment.interface';
import { MachineDTO } from './dto/machine.dto';
import { Machine } from './interfaces/machine.interface';
import { MachineConfig } from './machine.config';

@Injectable()
export class MachineRepository {
  constructor(
    @InjectModel(MachineConfig.modelSchemaDefinition) private readonly machineModel: Model<Machine>,
  ) {}

  async saveMachine(newMachine: MachineDTO): Promise<Machine> {
    const createdMachine = new this.machineModel(newMachine);
    return createdMachine.save();
  }

  async getAllMachines(): Promise<Machine[]> {
    return await this.machineModel.find({}).sort({ name: +1 }).exec();
  }

  async getMachineByName(machineName: string): Promise<Machine> {
    return await this.machineModel.findOne({ name: machineName });
  }

  async getMachineById(machineId: Machine): Promise<Machine> {
    return await this.machineModel.findById(machineId);
  }

  async deleteMachineByName(machineName: string): Promise<Machine> {
    return this.machineModel.findOneAndDelete({ name: machineName });
  }

  async updateMachineByName(machineName: string, newMachine: MachineDTO) {
    const updatedMachine = await this.machineModel.replaceOne({ name: machineName }, newMachine);
    return updatedMachine.modifiedCount;
  }

  async getMachinesByEstablishment(establishment: Establishment): Promise<Machine[]> {
    return await this.machineModel.find({
      currentEstablishmentId: establishment,
    });
  }
}
