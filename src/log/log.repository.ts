import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Machine } from '../machine/interfaces/machine.interface';
import { LogDTO } from './dto/log.dto';
import { Log } from './interfaces/log.interface';
import { LogConfig } from './log.config';

@Injectable()
export class LogRepository {
  constructor(
    @InjectModel(LogConfig.modelSchemaDefinition) private readonly logModel: Model<Log>,
  ) {}

  async saveLog(newlog: LogDTO): Promise<Log> {
    const createdLog = new this.logModel(newlog);
    return createdLog.save();
  }

  async getAllLogs(): Promise<Log[]> {
    return await this.logModel.find({}).sort({ name: +1 }).exec();
  }

  async getLogById(logID: string): Promise<Log> {
    return await this.logModel.findById(logID);
  }

  async deleteLogById(logID: string): Promise<Log> {
    return this.logModel.findOneAndDelete({ _id: logID });
  }

  async updateLogById(logID: string, newLog: LogDTO) {
    const updatedLog = await this.logModel.replaceOne({ _id: logID }, newLog);
    return updatedLog.modifiedCount;
  }

  async getLogsByMachineId(machineId: Machine): Promise<Log[]> {
    return await this.logModel.find({
      machineId: machineId,
    });
  }

  async getLogsByEstablishment(establishment: string): Promise<Log[]> {
    return await this.logModel.find({
      establishmentId: establishment,
    });
  }
}
