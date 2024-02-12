import { BadRequestException, Injectable } from '@nestjs/common';

import { LogDTO } from 'src/models/logs/dto/logs.dto';
import { Log } from 'src/models/logs/interfaces/log.interface';
import { MachinesCommonService } from 'src/models/machines/common/services/machines.service';
import { LogRepository } from '../log.repository';

@Injectable()
export class LogsService {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly machinesService: MachinesCommonService,
  ) {}

  async getAllLogs(): Promise<Log[]> {
    const allLogs = await this.logRepository.getAllLogs();

    if (!allLogs.length) throw new BadRequestException('There are no registers');

    return allLogs;
  }

  async saveLog(newLog: LogDTO): Promise<Log> {
    const existMachine = await this.machinesService.existsMachineByName(newLog.machineName);

    if (existMachine) {
      const existMachineModel = await this.machinesService.getMachineByName(newLog.machineName);

      const updatedMachineData = {
        name: existMachineModel.name,
        paperStock: existMachineModel.paperStock - newLog.usedPaper,
        inkStock: existMachineModel.inkStock - newLog.usedInk,
        currentEstablishment: newLog.establishment,
        currentCity: newLog.city,
        currentProvince: newLog.province,
        currentLocalMachineNumber: newLog.localMachineNumber,
      };

      await this.machinesService.updateMachineByName(newLog.machineName, updatedMachineData);

      return await this.logRepository.saveLog(newLog);
    }

    throw new BadRequestException('Machine does not exist');
  }

  async getLogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.getLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results');

      return existLog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletelogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.deleteLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results');

      return existLog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateLogById(logID: string, newLog: LogDTO): Promise<Log> {
    try {
      const existLog = await this.logRepository.getLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results');

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
