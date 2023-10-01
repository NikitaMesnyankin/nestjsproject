import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import * as i from "../entities/interfaces";
import { UserAccountNotActivated, UserNotFound } from "../users/errors";
import { ValidationPayload } from "./strategies/jwt.strategy";
import { UserEntity } from "../entities/user.entity";
import { UsersService } from "src/users/users.service";
import { WrongPassword } from "./errors";
import { Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<Omit<UserEntity, "password">>> {
    const user = await this.usersService.getUsersByFilters({
      email,
    });
    if (!user.length) {
      throw new UserNotFound();
    }

    if (!user[0].isActivated) {
      throw new UserAccountNotActivated();
    }

    const isPasswordMatching = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordMatching) {
      throw new WrongPassword();
    }
    user[0].password = undefined;
    return user[0];
  }

  async generateJwtToken({ id, email, role }: i.Interfaces.UserInReq) {
    const payload: ValidationPayload = { id, email, role };
    Logger.warn(`PAYLOAD: ${JSON.stringify(payload)}`);
    //Logger.error(this.jwtService.sign(payload));
    return this.jwtService.sign(payload);
  }
}
