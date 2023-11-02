import { ApiProperty } from '@nestjs/swagger';
import { CreateGeoDto } from './create-geo.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAddressDto {
  @IsString()
  @ApiProperty({ type: String })
  street: string;

  @IsString()
  @ApiProperty({ type: String })
  suite: string;

  @IsString()
  @ApiProperty({ type: String })
  city: string;

  @IsString()
  @ApiProperty({ type: String })
  zipcode: string;

  @ValidateNested()
  @Type(() => CreateGeoDto)
  @ApiProperty({ type: CreateGeoDto })
  geo: CreateGeoDto;
}
