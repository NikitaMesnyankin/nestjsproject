import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  Min,
  Max,
  MinLength,
  IsInt,
} from "class-validator";
import * as i from "../../entities/interfaces";
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
  login: string;

  @ApiProperty({
    required: true,
    description: "User password's hash",
    type: String,
  })
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
  @IsString()
  activationLink: string;
}

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
