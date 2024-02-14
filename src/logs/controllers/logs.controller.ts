import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Log } from '../../logs/interfaces/log.interface';
import { Machine } from '../../machines/interfaces/machine.interface';
import { LogsService } from '../services/logs.service';
import { LogDTO } from '../dto/logs.dto';
import { LogConfig } from '../log.config';

@Controller(LogConfig.controllerDefinition)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async saveLog(@Body() newLog: LogDTO): Promise<Log> {
    return await this.logsService.saveLog(newLog);
  }

  @Get()
  async getAllLogs(): Promise<Log[]> {
    return await this.logsService.getAllLogs();
  }

  @Get('id/:logID')
  async getLogById(@Param('logID') logID: string): Promise<Log> {
    return await this.logsService.getLogById(logID);
  }

  @Get('machine/:machineID')
  async getLogsByMachineId(@Param('machineID') machineId: Machine): Promise<Log[]> {
    return await this.logsService.getLogsByMachineId(machineId);
  }

  @Get('establishment/:establishment')
  async getLogsByEstablishment(@Param('establishment') establishment: string): Promise<Log[]> {
    return await this.logsService.getLogsByEstablishment(establishment);
  }

  @Patch('id/:logID')
  async updateLogById(@Param('logID') logID: string, @Body() newLog: LogDTO): Promise<Log> {
    return await this.logsService.updateLogById(logID, newLog);
  }

  @Delete('id/:logID')
  async deletelogById(@Param('logID') logID: string): Promise<Log> {
    return await this.logsService.deletelogById(logID);
  }
}
