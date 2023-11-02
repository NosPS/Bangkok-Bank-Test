import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreatePostDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ type: Number })
  userId: number;

  @IsString()
  @ApiProperty({ type: String })
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  body: string;
}
