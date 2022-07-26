import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '../../user/user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { NO_CONTENT_STATUS_CODE } from '../../config/http';
import { RoleDbService } from '../../data/role/role.service';
import { User } from '../../data/user/user.entity';
import { SuperuserGuard } from '../../auth/superuser.guard';
import { BreedDbService } from '../../data/breed/breed.service';
import { Breed } from '../../data/breed/breed.entity';
import { BreedCreateDto } from '../../dto/breed-create.dto';
import { SETTINGS } from '../../app.utils';
import { MessageResponse } from '../../types/message-response.types';
import { readCsv } from '../../utils';

@ApiTags('superuser')
@Controller('superuser')
export class SuperuserController {
  constructor(private userService: UserService, private role: RoleDbService, private breedDbService: BreedDbService) {}

  @Get('install')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  async getInstall() {
    await this.role.initRoles();
  }

  @UseGuards(JwtAuthGuard, SuperuserGuard)
  @ApiBearerAuth()
  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }

  @UseGuards(JwtAuthGuard, SuperuserGuard)
  @ApiBearerAuth()
  @Get('breeds')
  getBreeds(): Promise<Breed[]> {
    return this.breedDbService.listAll();
  }

  @UseGuards(JwtAuthGuard, SuperuserGuard)
  @ApiBearerAuth()
  @Post('breeds')
  postBreeds(@Body(SETTINGS.VALIDATION_PIPE) body: BreedCreateDto): Promise<Breed> {
    return this.breedDbService.create(body);
  }

  @UseGuards(JwtAuthGuard, SuperuserGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @Post('breeds/csv')
  postBreedsCsv(@UploadedFile() file: Express.Multer.File) {
    if (file.mimetype !== 'text/csv') {
      throw new UnprocessableEntityException('Invalid file type');
    }

    const breeds = readCsv(file.buffer) as BreedCreateDto[];

    return this.breedDbService.createFromCsv(breeds);
  }

  @UseGuards(JwtAuthGuard, SuperuserGuard)
  @ApiBearerAuth()
  @Delete('breeds/:id')
  async deleteBreeds(@Param('id') id: number): Promise<MessageResponse> {
    const success = await this.breedDbService.delete(id);

    return {
      message: success ? 'Breed deleted' : 'Breed not found',
      success,
    };
  }
}
