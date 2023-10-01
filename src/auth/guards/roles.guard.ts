import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import jwtDecode from "jwt-decode";
import * as i from "../../entities/interfaces";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.cookies[this.configService.get("AUTH_COOKIE_NAME")]) {
      return true;
    }
    const tokenData: i.Interfaces.JwtToken = jwtDecode(
      request.cookies[this.configService.get("AUTH_COOKIE_NAME")],
    );
    Logger.warn(`TOKEN DATA: ${JSON.stringify(tokenData)}`);
    request.role = tokenData.role;
    return roles.some((r) => r === (tokenData.role as string));
  }
}

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
