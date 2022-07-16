import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { JwtPayload } from '../../types/jwt-payload.types';
import { PetService } from '../../pet/pet.service';
import { PetCreateDto } from '../../dto/pet-create.dto';
import { SETTINGS } from '../../app.utils';
import { Pet } from '../../data/pet/pet.entity';
import { PetInviteDto } from '../../dto/pet-invite.dto';
import { PetWeightService } from '../../pet-weight/pet-weight.service';
import { PetWeightCreateDto } from '../../dto/pet-weight-create.dto';
import { UserService } from '../../user/user.service';
import { VaccinationService } from '../../vaccination/vaccination.service';
import { VaccinationCreateDto } from '../../dto/vaccination-create.dto';

@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(
    private petService: PetService,
    private userService: UserService,
    private petWeightService: PetWeightService,
    private vaccinationService: VaccinationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('add')
  postAdd(@Request() req: { user: JwtPayload }, @Body(SETTINGS.VALIDATION_PIPE) body: PetCreateDto): Promise<Pet> {
    return this.petService.createNew(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('my')
  async getAllByUser(@Request() req: { user: JwtPayload }) {
    const unit = await this.userService.getWeightUnitById(req.user.userid);

    return this.petService.getAllByUserId(req.user.userid, unit);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async getPetDetails(@Param('id') id: string, @Request() req: { user: JwtPayload }) {
    const unit = await this.userService.getWeightUnitById(req.user.userid);

    return this.petService.getByPetId(id, unit, req.user.userid);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deletePet(@Param('id') id: string, @Request() req: { user: JwtPayload }) {
    return this.petService.removePet(id, req.user.userid);
  }

  @ApiTags('pets-weight')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/weight')
  async getWeightById(@Param('id') id: string, @Request() req: { user: JwtPayload }) {
    const unit = await this.userService.getWeightUnitById(req.user.userid);

    return this.petWeightService.getAllByPetId(id, unit);
  }

  @ApiTags('pets-weight')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/weight')
  async postWeightById(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE) body: PetWeightCreateDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.petWeightService.createNew(id, body, req.user.userid);
  }

  @ApiTags('pets-vaccine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/vaccine')
  async getVaccineById(@Param('id') id: string) {
    return this.vaccinationService.findByPetId(id);
  }

  @ApiTags('pets-vaccine')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':id/vaccine')
  async postVaccineById(
    @Param('id') petId: string,
    @Body(SETTINGS.VALIDATION_PIPE) body: VaccinationCreateDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.vaccinationService.addNewVaccination(req.user.userid, petId, body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('invite')
  postInvite(@Body(SETTINGS.VALIDATION_PIPE) body: PetInviteDto, @Request() req: { user: JwtPayload }): Promise<boolean> {
    return this.petService.inviteNewUser(body, req.user.userid);
  }
}
