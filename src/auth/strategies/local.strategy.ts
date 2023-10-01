import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    Logger.warn("LOCAL STRATEGY START");
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<Omit<UserEntity, "password">>> {
    return await this.authService.validateUser(email, password);
  }
}
