import { BadRequestException, Injectable } from '@nestjs/common';

import { MachinesService } from '../../machine/services/machine.service';
import { Machine } from '../../machine/interfaces/machine.interface';
import { LogDTO } from '../dto/log.dto';
import { Log } from '../interfaces/log.interface';
import { LogRepository } from '../log.repository';
import { MachineDTO } from '../../machine/dto/machine.dto';

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

    const updatedMachineData: MachineDTO = {
      currentEstablishmentId: existMachine.currentEstablishmentId,
      name: existMachine.name,
      paperStock: existMachine.paperStock - newLog.usedPaperCount,
      printerInkStock: existMachine.printerInkStock - newLog.usedPrinterInk,
    };

    if (updatedMachineData.paperStock < 0 && updatedMachineData.printerInkStock < 0)
      throw new BadRequestException('Unavailable stock');
    else if (updatedMachineData.paperStock < 0)
      throw new BadRequestException("The machine doesn't have enough paper stock");
    else if (updatedMachineData.printerInkStock < 0)
      throw new BadRequestException("The machine doesn't have enough printer ink stock");

    await this.machinesService.updateMachineByName(existMachine.name, updatedMachineData);

    const updatedlogData: LogDTO = {
      ...newLog,
      establishmentId: existMachine.currentEstablishmentId,
    };

    return await this.logRepository.saveLog(updatedlogData);
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

  async getLogsByMachineId(machineId: Machine): Promise<Log[]> {
    try {
      const foundLogs = await this.logRepository.getLogsByMachineId(machineId);

      if (!foundLogs.length)
        throw new BadRequestException('There are no results for this machine ID');

      return foundLogs;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLogsByEstablishment(establishment: string): Promise<Log[]> {
    try {
      const foundLogs = await this.logRepository.getLogsByEstablishment(establishment);

      if (!foundLogs.length)
        throw new BadRequestException('There are no results for this establishment');

      return foundLogs;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
