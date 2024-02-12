import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MachineDTO } from 'src/machines/dto/machines.dto';
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
    return await this.machineModel.find({}, { __v: false }).sort({ name: +1 }).exec();
  }

  async getMachineByName(machineName: string): Promise<Machine> {
    return await this.machineModel.findOne({ name: machineName }, { __v: false });
  }

  async deleteMachineByName(machineName: string): Promise<Machine> {
    return this.machineModel.findOneAndDelete({ name: machineName });
  }

  async updateMachineByName(machineName: string, newMachine: MachineDTO) {
    const updatedMachine = await this.machineModel.replaceOne({ name: machineName }, newMachine);
    return updatedMachine.modifiedCount;
  }

  async getMachinesByEstablishment(establishment: string): Promise<Machine[]> {
    return await this.machineModel.find(
      {
        currentEstablishment: { $regex: establishment, $options: 'i' },
      },
      { __v: false },
    );
  }
}
