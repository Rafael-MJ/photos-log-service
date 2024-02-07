import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { LogDTO } from 'src/models/logs/dto/logs.dto';
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
    return await this.logModel.find({}, { __v: false }).sort({ name: +1 }).exec();
  }

  async getLogById(logID: string): Promise<Log> {
    return await this.logModel.findById(logID, { __v: false });
  }

  async deleteLogById(logID: string): Promise<Log> {
    return this.logModel.findOneAndDelete({ _id: logID });
  }

  async updateLogById(logID: string, newLog: LogDTO) {
    const updatedLog = await this.logModel.replaceOne({ _id: logID }, newLog);
    return updatedLog.modifiedCount;
  }

  async getLogByMachineName(machineName: string): Promise<Log[]> {
    return await this.logModel.find(
      {
        'machine.name': { $regex: machineName, $options: 'i' },
      },
      { __v: false },
    );
  }

  async getlogByName(logName: string): Promise<Log[]> {
    return await this.logModel.find(
      {
        name: { $regex: logName, $options: 'i' },
      },
      { __v: false },
    );
  }
}
