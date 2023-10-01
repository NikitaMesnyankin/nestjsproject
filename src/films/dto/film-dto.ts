import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  NotEquals,
  IsOptional,
  IsEnum,
  IsIn,
  ValidateNested,
} from "class-validator";
import * as i from "../../entities/interfaces";
import {
  OrderDirection,
  OrderDirections,
  PaginationDto,
} from "../../helpers/dto";
import { Type } from "class-transformer";

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
    enum: i.Interfaces.Countries,
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

export class FilmFilterFields {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;
}

export class FilmOrderByFields {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  averageRating: OrderDirection;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  country: OrderDirection;
}

export class SearchFilmsFieldsDto extends PaginationDto {
  @ValidateNested()
  @Type(() => FilmOrderByFields)
  order: FilmOrderByFields;

  @ValidateNested()
  @Type(() => FilmFilterFields)
  filters: FilmFilterFields;
}
