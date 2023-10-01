import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "./users.service";
import { MailerService } from "../mailer/mailer.service";
import * as i from "../entities/interfaces";
import {
  SearchUsersFieldsDto,
  UserActivationLinkDto,
  UserDto,
} from "./dto/user-dto";
import { Roles, RolesGuard } from "../auth/guards/roles.guard";

@Controller("/users")
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @Post("/register")
  @HttpCode(201)
  async register(@Body() body: UserDto): Promise<i.Interfaces.ActivationData> {
    const registrationResult = await this.userService.registerUser(body);
    await this.mailerService.sendEmail({
      from: this.configService.get("MAILER_USERNAME"),
      to: this.configService.get("MAILER_USERNAME"),
      subject: "REVIEWFY ACCOUNT VERIFICATION",
      html: `Welcome to Reviewfy! Activate your account using link below: <br><a href="${this.configService.get(
        "BASE_URL",
      )}/users/activate?activationLink=${
        registrationResult.activationLink
      }">ACTIVATE YOUR REVIEWFY ACCOUNT</a>`,
    });
    return {
      login: registrationResult.login,
      activationStatus: registrationResult.activationStatus,
      activationLink: registrationResult.activationLink,
    };
  }

  @Get("/activate")
  @HttpCode(200)
  async activateAccount(
    @Query() query: UserActivationLinkDto,
  ): Promise<i.Interfaces.ActivationData> {
    return await this.userService.activateUserByLink(query.activationLink);
  }

  @UseGuards(RolesGuard)
  @Roles("USER", "ADMIN")
  @Post("/search")
  @HttpCode(200)
  async getAllUsers(
    @Body() body: SearchUsersFieldsDto,
    @Request() request,
  ): Promise<Partial<i.Interfaces.User>[]> {
    return await this.userService.getAllUsers(
      body.count,
      body.page,
      !request.role || request.role === "USER" ? { isActivated: true } : {},
      body.order,
    );
  }
}
