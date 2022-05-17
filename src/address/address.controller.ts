import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UsePipes,
  ValidationPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from 'src/app.guards';
import { Roles } from 'src/entities/user.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@UsePipes(ValidationPipe)
@SetMetadata('role', Roles.CUSTOMER)
@UseGuards(AuthGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
    @Session() session: Record<string, any>,
  ) {
    return this.addressService.create(createAddressDto, session);
  }

  @Get()
  findAll(@Session() session: Record<string, any>) {
    return this.addressService.findAll(session);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
