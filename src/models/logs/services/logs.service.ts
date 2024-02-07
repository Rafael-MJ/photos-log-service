import { BadRequestException, Injectable } from '@nestjs/common';

import { LogDTO } from 'src/models/logs/dto/logs.dto';
import { Log } from 'src/models/logs/interfaces/log.interface';
import { LogRepository } from '../log.repository';

@Injectable()
export class logsService {
  constructor(private readonly logRepository: LogRepository) {}

  async getAllLogs(): Promise<Log[]> {
    const allLogs = await this.logRepository.getAllLogs();

    if (!allLogs.length) throw new BadRequestException('There are no registers');

    return allLogs;
  }

  async saveLog(newLog: LogDTO): Promise<Log> {
    return await this.logRepository.saveLog(newLog);
  }

  async getLogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.getLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results');

      return existLog;
    } catch (error) {
      throw new BadRequestException('There are no results');
    }
  }

  async deletelogById(logID: string): Promise<Log> {
    try {
      const existLog = await this.logRepository.deleteLogById(logID);

      if (!existLog) throw new BadRequestException('There are no results');

      return existLog;
    } catch (error) {
      throw new BadRequestException('This log does not exists');
    }
  }

  async updateLogById(logID: string, newLog: LogDTO): Promise<Log> {
    const existLog = await this.logRepository.getLogById(logID);

    if (!existLog) throw new BadRequestException('There are no results');

    const updatedLog = await this.logRepository.updateLogById(logID, newLog);

    if (updatedLog) return this.logRepository.getLogById(logID);

    throw new BadRequestException('Error in update');
  }

  async getLogsByMachineName(machineName: string): Promise<Log[]> {
    const foundLogs = await this.logRepository.getLogsByMachineName(machineName);

    if (!foundLogs.length) throw new BadRequestException('No results for this machine');

    return foundLogs;
  }
}
