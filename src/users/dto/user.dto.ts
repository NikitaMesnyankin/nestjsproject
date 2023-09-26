import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  Matches,
  MinLength,
  NotEquals,
  IsUUID,
  IsIn,
  ValidateNested,
  IsOptional,
} from "class-validator";
import * as i from "../../entities/interfaces";
import {
  OrderDirection,
  OrderDirections,
  PaginationDto,
} from "../../helpers/dto";
import { Type } from "class-transformer";

export class UserDto implements i.Interfaces.User {
  @ApiProperty({
    required: true,
    description: "User login",
    type: String,
  })
  @IsString()
  @MinLength(10)
  @Matches(/([a-z]|\d)*/)
  @NotEquals("null")
  login: string;

  @ApiProperty({
    required: true,
    description: "User password",
    type: String,
  })
  @MinLength(10)
  @Matches(
    /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~])./,
  )
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    description: "User email",
    type: String,
  })
  @IsEmail()
  email: string;
}

export class UserActivationLinkDto {
  @ApiProperty({
    required: true,
  })
  @IsUUID()
  activationLink: string;
}

export class UserOrderByFields {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  rating: OrderDirection;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(OrderDirections)
  createdAt: OrderDirection;
}

export class SearchUsersFieldsDto extends PaginationDto {
  @ValidateNested()
  @Type(() => UserOrderByFields)
  order: UserOrderByFields;
}
