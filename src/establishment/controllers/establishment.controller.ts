import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { Establishment } from '../interfaces/establishment.interface';
import { EstablishmentService } from '../services/establishment.service';
import { EstablishmentDTO } from '../dto/establishment.dto';
import { EstablishmentConfig } from '../establishment.config';

@Controller(EstablishmentConfig.controllerDefinition)
export class EstablishmentController {
  constructor(private readonly establishmentsService: EstablishmentService) {}

  @Post()
  async saveEstablishment(@Body() newEstablishment: EstablishmentDTO): Promise<Establishment> {
    return await this.establishmentsService.saveEstablishment(newEstablishment);
  }

  @Get()
  async getAllEstablishments(): Promise<Establishment[]> {
    return await this.establishmentsService.getAllEstablishments();
  }

  @Get('id/:establishmentId')
  async getEstablishmentById(
    @Param('establishmentId') establishmentId: Establishment,
  ): Promise<Establishment> {
    return await this.establishmentsService.getEstablishmentById(establishmentId);
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

  @Get('state/:state')
  async getEstablishmentsByState(@Param('state') state: string): Promise<Establishment[]> {
    return await this.establishmentsService.getEstablishmentsByState(state);
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
