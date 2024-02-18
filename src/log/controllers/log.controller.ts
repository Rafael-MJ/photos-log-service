import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Log } from '../interfaces/log.interface';
import { Machine } from '../../machine/interfaces/machine.interface';
import { LogService } from '../services/log.service';
import { LogDTO } from '../dto/log.dto';
import { LogConfig } from '../log.config';

@Controller(LogConfig.controllerDefinition)
export class LogController {
  constructor(private readonly logsService: LogService) {}

  @Post()
  async saveLog(@Body() newLog: LogDTO): Promise<Log> {
    return await this.logsService.saveLog(newLog);
  }

  @Get()
  async getAllLogs(): Promise<Log[]> {
    return await this.logsService.getAllLogs();
  }

  @Get('id/:logId')
  async getLogById(@Param('logId') logID: string): Promise<Log> {
    return await this.logsService.getLogById(logID);
  }

  @Get('machine/:machineId')
  async getLogsByMachineId(@Param('machineId') machineId: Machine): Promise<Log[]> {
    return await this.logsService.getLogsByMachineId(machineId);
  }

  @Get('establishment/:establishment')
  async getLogsByEstablishment(@Param('establishment') establishment: string): Promise<Log[]> {
    return await this.logsService.getLogsByEstablishment(establishment);
  }

  @Patch('id/:logId')
  async updateLogById(@Param('logId') logID: string, @Body() newLog: LogDTO): Promise<Log> {
    return await this.logsService.updateLogById(logID, newLog);
  }

  @Delete('id/:logId')
  async deletelogById(@Param('logId') logID: string): Promise<Log> {
    return await this.logsService.deletelogById(logID);
  }
}
