import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateGeoDto {
  @IsString()
  @Transform(({ value }) => String(value))
  @ApiProperty({ type: String })
  lat: string;

  @IsString()
  @Transform(({ value }) => String(value))
  @ApiProperty({ type: String })
  lng: string;
}
