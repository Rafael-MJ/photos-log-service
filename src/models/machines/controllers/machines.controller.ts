import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Machine } from 'src/models/machines/interfaces/machine.interface';
import { MachinesService } from '../services/machines.service';
import { MachineDTO } from '../dto/machines.dto';
import { MachineConfig } from '../machine.config';
import { MachinesCommonService } from '../common/services/machines.service';

@Controller(MachineConfig.controllerDefinition)
export class MachinesController {
  constructor(
    private readonly machinesService: MachinesService,
    readonly machinesCommonService: MachinesCommonService,
  ) {}

  @Get()
  async getAllMachines(): Promise<Machine[]> {
    return await this.machinesService.getAllMachines();
  }

  @Get('name/:machineName')
  async getMachineByName(@Param('machineName') machineName: string): Promise<Machine> {
    return await this.machinesCommonService.getMachineByName(machineName);
  }

  @Get('establishment/:establishment')
  async getMachinesByEstablishment(
    @Param('establishment') establishment: string,
  ): Promise<Machine[]> {
    return await this.machinesService.getMachinesByEstablishment(establishment);
  }

  @Post()
  async saveMachine(@Body() newMachine: MachineDTO): Promise<Machine> {
    return await this.machinesService.saveMachine(newMachine);
  }

  @Patch('name/:machineName')
  async updateMachineByName(
    @Param('machineName') machineName: string,
    @Body() newMachine: MachineDTO,
  ): Promise<Machine> {
    return await this.machinesCommonService.updateMachineByName(machineName, newMachine);
  }

  @Delete('name/:machineName')
  async deleteMachineByName(@Param('machineName') machineName: string): Promise<Machine> {
    return await this.machinesService.deleteMachineByName(machineName);
  }
}
