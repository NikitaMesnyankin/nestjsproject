import { Body, Controller, HttpCode, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as i from "../entities/interfaces";
import { UserActivationLinkDto, UserDto } from "./dto/user.dto";

@Controller("/users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post("/register")
  @HttpCode(201)
  async register(@Body() body: UserDto): Promise<i.Interfaces.ActivationData> {
    const registrationResult = await this.userService.registerUser(body);
    return {
      login: registrationResult.login,
      activationStatus: registrationResult.activationStatus,
      activationLink: registrationResult.activationLink,
    };
  }

  @Post("/activate")
  @HttpCode(200)
  async activateAccount(
    @Query() query: UserActivationLinkDto,
  ): Promise<i.Interfaces.ActivationData> {
    return await this.userService.activateUserByLink(query.activationLink);
  }
}
