import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  MinLength,
  IsInt,
  NotEquals,
  Min,
  Max,
} from "class-validator";
import * as i from "../../entities/interfaces";

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
