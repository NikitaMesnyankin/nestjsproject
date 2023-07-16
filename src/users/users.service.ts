import { Injectable } from "@nestjs/common";
import { UserDao, UserData } from "./dao/user-dao";
import {
  ActivationLinkAlreadyUsed,
  UserAlreadyExists,
  UserNotFound,
} from "./errors";
import * as i from "../entities/interfaces";

@Injectable()
export class UsersService {
  constructor(private readonly userDao: UserDao) {}

  async registerUser(userData: UserData): Promise<i.Interfaces.ActivationData> {
    if (await this.userDao.checkUserExistsByLoginOrEmail(userData)) {
      throw new UserAlreadyExists();
    }
    const registrationResult = await this.userDao.createUser(userData);
    return {
      login: registrationResult.login,
      activationLink: registrationResult.activationLink,
      activationStatus: registrationResult.isActivated,
    };
  }

  async activateUserByLink(
    activationLink: string,
  ): Promise<i.Interfaces.ActivationData> {
    const foundUser = await this.userDao.findUserByFilter({
      activationLink,
    });
    if (!foundUser) {
      throw new UserNotFound();
    }
    const activationResult = await this.userDao.activateUser(foundUser);
    if (!activationResult) {
      throw new ActivationLinkAlreadyUsed();
    }
    return {
      login: activationResult.login,
      activationStatus: activationResult.isActivated,
      activationLink: null,
    };
  }
}
