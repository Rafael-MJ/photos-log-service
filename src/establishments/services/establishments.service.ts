import { BadRequestException, Injectable } from '@nestjs/common';

import { EstablishmentDTO } from './../dto/establishment.dto';
import { Establishment } from './../interfaces/establishment.interface';
import { EstablishmentRepository } from '../establishment.repository';

@Injectable()
export class EstablishmentsService {
  constructor(private readonly establishmentRepository: EstablishmentRepository) {}

  async getAllEstablishments(): Promise<Establishment[]> {
    const allEstablishments = await this.establishmentRepository.getAllEstablishments();

    if (!allEstablishments.length)
      throw new BadRequestException('There are no registers for establishments');

    return allEstablishments;
  }

  async saveEstablishment(newEstablishment: EstablishmentDTO): Promise<Establishment> {
    const existEstablishment = await this.establishmentRepository.getEstablishmentByName(
      newEstablishment.name,
    );

    if (!existEstablishment)
      return await this.establishmentRepository.saveEstablishment(newEstablishment);

    throw new BadRequestException('This establishment already exists');
  }

  async getEstablishmentByName(establishmentName: string): Promise<Establishment> {
    const existEstablishment =
      await this.establishmentRepository.getEstablishmentByName(establishmentName);

    if (!existEstablishment)
      throw new BadRequestException('There are no results for this establishment name');

    return existEstablishment;
  }

  async getEstablishmentById(establishmentId: Establishment): Promise<Establishment> {
    try {
      const existEstablishment =
        await this.establishmentRepository.getEstablishmentById(establishmentId);

      if (!existEstablishment)
        throw new BadRequestException('There are no results for this establishment ID');

      return existEstablishment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateEstablishmentByName(
    establishmentName: string,
    newEstablishment: EstablishmentDTO,
  ): Promise<Establishment> {
    try {
      const existEstablishment =
        await this.establishmentRepository.getEstablishmentByName(establishmentName);

      if (!existEstablishment)
        throw new BadRequestException('There are no results for this establishment');

      await this.establishmentRepository.updateEstablishmentByName(
        establishmentName,
        newEstablishment,
      );

      return await this.getEstablishmentByName(newEstablishment.name);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteEstablishmentByName(establishmentName: string): Promise<Establishment> {
    const existEstablishment =
      await this.establishmentRepository.deleteEstablishmentByName(establishmentName);

    if (!existEstablishment) throw new BadRequestException('This establishment does not exist');

    return existEstablishment;
  }

  async getEstablishmentsByCity(city: string): Promise<Establishment[]> {
    const foundEstablishments = await this.establishmentRepository.getEstablishmentsByCity(city);

    if (!foundEstablishments.length)
      throw new BadRequestException('There are no results for this city');

    return foundEstablishments;
  }

  async getEstablishmentsByProvince(province: string): Promise<Establishment[]> {
    const foundEstablishments =
      await this.establishmentRepository.getEstablishmentsByProvince(province);

    if (!foundEstablishments.length)
      throw new BadRequestException('There are no results for this province');

    return foundEstablishments;
  }
}
