import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { UserEntity } from "../../entities/user.entity";
import { Logger } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Partial<Omit<UserEntity, "password">>> {
    const a = await this.authService.validateUser(email, password);
    Logger.error(JSON.stringify(a));
    return a;
  }
}
