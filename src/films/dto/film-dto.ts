import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  NotEquals,
  IsOptional,
  IsEnum,
} from "class-validator";
import * as i from "../../entities/interfaces";

export class FilmDto implements i.Interfaces.Film {
  @ApiProperty({
    required: true,
    description: "Film name",
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    required: true,
    description: "Film's author",
  })
  @IsString()
  @MinLength(1)
  @NotEquals("null")
  author: string;

  @ApiProperty({
    required: true,
    description: "Film creation country",
    type: i.Interfaces.Countries,
  })
  @IsEnum(i.Interfaces.Countries)
  country: i.Interfaces.Countries;

  @ApiProperty({
    required: false,
    description: "Film description",
  })
  @IsString()
  @MinLength(100)
  @IsOptional()
  description: string | null;
}
