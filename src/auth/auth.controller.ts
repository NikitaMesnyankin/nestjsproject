import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { MailerService } from "../mailer/mailer.service";
import * as i from "../entities/interfaces";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() request: i.Interfaces.UserReq, @Res() response: Response) {
    const user = request.user;
    const token = await this.authService.generateJwtToken(user);
    response.cookie(this.configService.get("AUTH_COOKIE_NAME"), token, {
      maxAge: this.configService.get("EXPIRATION_TIME"),
      httpOnly: true,
      path: "/",
      domain: undefined,
    });
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: i.Interfaces.UserReq) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Req() request: i.Interfaces.UserReq, @Res() response: Response) {
    response.cookie(this.configService.get("AUTH_COOKIE_NAME"), "", {
      maxAge: 0,
      httpOnly: true,
      path: "/",
    });
    return response.sendStatus(200);
  }

  @Post("sendemail")
  async sendemail(@Res() response: Response) {
    return response.send(
      await this.mailerService.sendEmail({
        from: this.configService.get("MAILER_USERNAME"),
        to: this.configService.get("MAILER_USERNAME"),
        subject: "MAILER SERVICE HEALTHCHECK",
        html: `<p>OK (RUNNING ON ${this.configService.get("BASE_URL")})</p>`,
      }),
    );
  }
}
