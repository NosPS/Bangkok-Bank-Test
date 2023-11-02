import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { CreateCompanyDto } from './create-company.dto';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  username: string;

  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty({ type: CreateAddressDto })
  address: CreateAddressDto;

  @IsString()
  @ApiProperty({ type: String })
  phone: string;

  @IsString()
  @ApiProperty({ type: String })
  website: string;

  @ValidateNested()
  @Type(() => CreateCompanyDto)
  @ApiProperty({ type: CreateCompanyDto })
  company: CreateCompanyDto;
}
