import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as i from "../entities/interfaces";
import { PaginationDto, UserActivationLinkDto, UserDto } from "./dto/user.dto";

@Controller("/users")
export class UsersController {
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

  @Get()
  @HttpCode(200)
  async getAllUsers(
    @Query() query: PaginationDto,
  ): Promise<Partial<i.Interfaces.User>[]> {
    return await this.userService.getAllUsers(query.count, query.page);
  }
}
