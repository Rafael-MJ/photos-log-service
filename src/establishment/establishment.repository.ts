import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { EstablishmentDTO } from './dto/establishment.dto';
import { Establishment } from './interfaces/establishment.interface';
import { EstablishmentConfig } from './establishment.config';

@Injectable()
export class EstablishmentRepository {
  constructor(
    @InjectModel(EstablishmentConfig.modelSchemaDefinition)
    private readonly establishmentModel: Model<Establishment>,
  ) {}

  async saveEstablishment(newEstablishment: EstablishmentDTO): Promise<Establishment> {
    const createdEstablishment = new this.establishmentModel(newEstablishment);
    return createdEstablishment.save();
  }

  async getAllEstablishments(): Promise<Establishment[]> {
    return await this.establishmentModel.find({}).sort({ name: +1 }).exec();
  }

  async getEstablishmentByName(establishmentName: string): Promise<Establishment> {
    return await this.establishmentModel.findOne({ name: establishmentName });
  }

  async getEstablishmentById(establishmentId: Establishment): Promise<Establishment> {
    return await this.establishmentModel.findById(establishmentId);
  }

  async deleteEstablishmentByName(establishmentName: string): Promise<Establishment> {
    return this.establishmentModel.findOneAndDelete({ name: establishmentName });
  }

  async updateEstablishmentByName(establishmentName: string, newEstablishment: EstablishmentDTO) {
    const updatedEstablishment = await this.establishmentModel.replaceOne(
      { name: establishmentName },
      newEstablishment,
    );
    return updatedEstablishment.modifiedCount;
  }

  async getEstablishmentsByCity(city: string): Promise<Establishment[]> {
    return await this.establishmentModel.find({
      city: { $regex: city, $options: 'i' },
    });
  }

  async getEstablishmentsByState(state: string): Promise<Establishment[]> {
    return await this.establishmentModel.find({
      state: { $regex: state, $options: 'i' },
    });
  }
}
