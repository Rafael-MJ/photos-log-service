import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Establishment } from './../interfaces/establishment.interface';
import { EstablishmentsService } from '../services/establishments.service';
import { EstablishmentDTO } from '../dto/establishment.dto';
import { EstablishmentConfig } from '../establishment.config';

@Controller(EstablishmentConfig.controllerDefinition)
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  async saveEstablishment(@Body() newEstablishment: EstablishmentDTO): Promise<Establishment> {
    return await this.establishmentsService.saveEstablishment(newEstablishment);
  }

  @Get()
  async getAllEstablishments(): Promise<Establishment[]> {
    return await this.establishmentsService.getAllEstablishments();
  }

  @Get('id/:establishmentID')
  async getEstablishmentById(
    @Param('establishmentID') establishmentName: Establishment,
  ): Promise<Establishment> {
    return await this.establishmentsService.getEstablishmentById(establishmentName);
  }

  @Get('name/:establishmentName')
  async getEstablishmentByName(
    @Param('establishmentName') establishmentName: string,
  ): Promise<Establishment> {
    return await this.establishmentsService.getEstablishmentByName(establishmentName);
  }

  @Get('city/:city')
  async getEstablishmentsByCity(@Param('city') city: string): Promise<Establishment[]> {
    return await this.establishmentsService.getEstablishmentsByCity(city);
  }

  @Get('province/:province')
  async getEstablishmentsByProvince(@Param('province') province: string): Promise<Establishment[]> {
    return await this.establishmentsService.getEstablishmentsByProvince(province);
  }

  @Patch('name/:establishmentName')
  async updateEstablishmentByName(
    @Param('establishmentName') establishmentName: string,
    @Body() newEstablishment: EstablishmentDTO,
  ): Promise<Establishment> {
    return await this.establishmentsService.updateEstablishmentByName(
      establishmentName,
      newEstablishment,
    );
  }

  @Delete('name/:establishmentName')
  async deleteEstablishmentByName(
    @Param('establishmentName') establishmentName: string,
  ): Promise<Establishment> {
    return await this.establishmentsService.deleteEstablishmentByName(establishmentName);
  }
}
