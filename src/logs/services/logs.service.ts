import { BadRequestException, Injectable } from '@nestjs/common';

import { MachinesService } from '../../machines/services/machines.service';
import { LogDTO } from '../../logs/dto/logs.dto';
import { Log } from '../../logs/interfaces/log.interface';
import { LogRepository } from '../log.repository';

@Injectable()
export class LogsService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly machinesService: MachinesService,
  ) {}

  async getAllLogs(): Promise<Log[]> {
    const allLogs = await this.logRepository.getAllLogs();

    if (!allLogs.length) throw new BadRequestException('There are no registers for logs');

    return allLogs;
  }

  async saveLog(newLog: LogDTO): Promise<Log> {
    const existMachine = await this.machinesService.getMachineById(newLog.machineId);

    if (existMachine) {
      const updatedMachineData = {
        name: existMachine.name,
        paperStock: existMachine.paperStock - newLog.usedPaper,
        inkStock: existMachine.inkStock - newLog.usedInk,
        currentEstablishment: newLog.establishment,
        currentCity: newLog.city,
        currentProvince: newLog.province,
        currentLocalMachineNumber: newLog.localMachineNumber,
      };

      await this.machinesService.updateMachineByName(existMachine.name, updatedMachineData);

      return await this.logRepository.saveLog(newLog);
    }

    throw new BadRequestException('This machine does not exist');
  }

  async getLogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.getLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results for this log ID');

      return existLog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletelogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.deleteLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results for this log ID');

      return existLog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateLogById(logID: string, newLog: LogDTO): Promise<Log> {
    try {
      const existLog = await this.logRepository.getLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results for this log');

      await this.logRepository.updateLogById(logID, newLog);

      return this.logRepository.getLogById(logID);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLogsByMachineName(machineName: string): Promise<Log[]> {
    const foundLogs = await this.logRepository.getLogsByMachineName(machineName);

    if (!foundLogs.length) throw new BadRequestException('There are no results for this machine');

    return foundLogs;
  }

  async getLogsByEstablishment(establishment: string): Promise<Log[]> {
    const foundLogs = await this.logRepository.getLogsByEstablishment(establishment);

    if (!foundLogs.length)
      throw new BadRequestException('There are no results for this establishment');

    return foundLogs;
  }
}
