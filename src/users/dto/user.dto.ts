import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import * as i from "../../entities/interfaces";

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
