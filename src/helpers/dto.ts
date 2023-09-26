import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";
import { FindOptionsOrder, FindOptionsOrderValue } from "typeorm";

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
  @Max(200)
  count: number;
}

export class OrderByDto<Entity> {
  @ApiProperty({
    required: false,
    description: "Films order by",
  })
  @Type(() => FindOptionOrderDto)
  orderBy: FindOptionsOrder<Entity>;
}

export class FindOptionOrderDto {
  [x: string]: FindOptionsOrderValue;
  //[Prop in keyof Entity]: value: T[Prop];
}

// export type EntityProperties = keyof FilmEntity;
//
// type Mapped<T> = {
//   [Prop in keyof T]: {
//     value: T[Prop];
//   };
// };
//
// type BaseMapped<T> = keyof Mapped<T>;
// type BaseMappedIndirect<T> = BaseMapped<T>;
// type MappedIndirect<T> = { [K in BaseMappedIndirect<T>]: boolean };
// class MappedImpl<T> implements MappedIndirect<T> {}
export const OrderDirections = ["DESC", "desc", "ASC", "asc"] as const;
export type OrderDirection = (typeof OrderDirections)[number];
