import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { Request } from "express";
import * as util from "util";
import * as i from "../../entities/interfaces";

export type ValidationPayload = {
  email: string;
  id: number;
  role: i.Interfaces.Roles;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    //Logger.warn(ExtractJwt.fromHeader("Authorization"));
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          Logger.error(`REQUEST COOKIES : ${util.inspect(request.cookies)}`);
          return request.cookies[configService.get("AUTH_COOKIE_NAME")];
        },
      ]),
      secretOrKey: "1",
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   ExtractJwt.fromHeader("Authorization"),
      //   (request: Request) =>
      //     request?.cookies?.[this.configService.get("AUTH_COOKIE_NAME")],
      // ]),
      // secretOrKey: "1",
      //secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: ValidationPayload) {
    Logger.error("VALIDATE FUNCTION");
    return await this.userService.getUserById(payload.id);
  }
}
