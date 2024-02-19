import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { EstablishmentDTO } from '../dto/establishment.dto';
import { Establishment } from '../interfaces/establishment.interface';
import { EstablishmentRepository } from '../establishment.repository';

@Injectable()
export class EstablishmentService {
  constructor(private readonly establishmentRepository: EstablishmentRepository) {}

  async getAllEstablishments(): Promise<Establishment[]> {
    const allEstablishments = await this.establishmentRepository.getAllEstablishments();

    if (!allEstablishments.length) {
      throw new NotFoundException('There are no registers for establishments');
    } else {
      return allEstablishments;
    }
  }

  async saveEstablishment(newEstablishment: EstablishmentDTO): Promise<Establishment> {
    const existEstablishment = await this.establishmentRepository.getEstablishmentByName(
      newEstablishment.name,
    );

    if (!existEstablishment) {
      return await this.establishmentRepository.saveEstablishment(newEstablishment);
    } else {
      throw new ConflictException('This establishment already exists');
    }
  }

  async getEstablishmentByName(establishmentName: string): Promise<Establishment> {
    const existEstablishment =
      await this.establishmentRepository.getEstablishmentByName(establishmentName);

    if (!existEstablishment) {
      throw new NotFoundException('There are no results for this establishment name');
    } else {
      return existEstablishment;
    }
  }

  async getEstablishmentById(establishmentId: Establishment): Promise<Establishment> {
    try {
      const existEstablishment =
        await this.establishmentRepository.getEstablishmentById(establishmentId);

      if (!existEstablishment) {
        throw new NotFoundException('There are no results for this establishment ID');
      } else {
        return existEstablishment;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateEstablishmentByName(
    establishmentName: string,
    newEstablishment: EstablishmentDTO,
  ): Promise<Establishment> {
    try {
      const existEstablishment =
        await this.establishmentRepository.getEstablishmentByName(establishmentName);

      if (!existEstablishment) {
        throw new NotFoundException('There are no results for this establishment');
      } else {
        await this.establishmentRepository.updateEstablishmentByName(
          establishmentName,
          newEstablishment,
        );

        return await this.getEstablishmentByName(newEstablishment.name);
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteEstablishmentByName(establishmentName: string): Promise<Establishment> {
    const existEstablishment =
      await this.establishmentRepository.deleteEstablishmentByName(establishmentName);

    if (!existEstablishment) {
      throw new NotFoundException('This establishment does not exist');
    } else {
      return existEstablishment;
    }
  }

  async getEstablishmentsByCity(city: string): Promise<Establishment[]> {
    const foundEstablishments = await this.establishmentRepository.getEstablishmentsByCity(city);

    if (!foundEstablishments.length) {
      throw new NotFoundException('There are no results for this city');
    } else {
      return foundEstablishments;
    }
  }

  async getEstablishmentsByState(state: string): Promise<Establishment[]> {
    const foundEstablishments = await this.establishmentRepository.getEstablishmentsByState(state);

    if (!foundEstablishments.length) {
      throw new NotFoundException('There are no results for this state');
    } else {
      return foundEstablishments;
    }
  }
}
