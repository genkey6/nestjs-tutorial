import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCatDto,
  // UpdateCatDto,
  // ListAllEntities,
} from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  @UseFilters(HttpExceptionFilter)
  async create(@Body(new ValidationPipe()) CreateCatDto: CreateCatDto) {
    this.catsService.create(CreateCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() UpdateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
