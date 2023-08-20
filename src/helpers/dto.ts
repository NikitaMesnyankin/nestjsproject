import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class PaginationDto {
  @ApiProperty({
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(50)
  count: number;
}
