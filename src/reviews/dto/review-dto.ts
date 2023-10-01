import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  IsInt,
  NotEquals,
  Min,
  Max,
  IsOptional,
  IsBoolean,
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

export class ReviewDto implements i.Interfaces.Review {
  @ApiProperty({
    required: true,
    description: "Review content",
  })
  @IsString()
  @NotEquals("null")
  @MinLength(100)
  content: string | null;

  @ApiProperty({
    required: true,
    description: "Review's author id",
  })
  @IsInt()
  @Min(1)
  authorId: number;

  @ApiProperty({
    required: true,
    description: "Film id to review",
  })
  @IsInt()
  @Min(1)
  filmId: number;

  @ApiProperty({
    required: true,
    description: "Author film score from 1 to 5",
  })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;
}

export class ReviewFilterFields {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActivated: boolean;
}

export class ReviewOrderByFields {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  karma: OrderDirection;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  createdAt: OrderDirection;
}

export class SearchReviewsFieldsDto extends PaginationDto {
  @ValidateNested()
  @Type(() => ReviewOrderByFields)
  order: ReviewOrderByFields;

  @ValidateNested()
  @Type(() => ReviewFilterFields)
  filters: ReviewFilterFields;
}
