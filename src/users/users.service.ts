import { Injectable } from "@nestjs/common";
import { UserDao, UserData } from "./dao/user-dao";
import {
  ActivationLinkAlreadyUsed,
  MultipleUsersFound,
  UserAlreadyExists,
  UserNotFound,
} from "./errors";
import * as i from "../entities/interfaces";
import { UserEntity } from "../entities/user.entity";
import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

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
    const foundUser = await this.userDao.findUsersByFilter({
      activationLink,
    });
    if (!foundUser.length) {
      throw new UserNotFound();
    }

    if (foundUser.length > 1) {
      throw new MultipleUsersFound();
    }

    const activationResult = await this.userDao.activateUser(foundUser[0]);
    if (!activationResult) {
      throw new ActivationLinkAlreadyUsed();
    }
    return {
      login: activationResult.login,
      activationStatus: activationResult.isActivated,
      activationLink: null,
    };
  }

  async getAllUsers(
    count: number,
    page: number,
    filters?: FindOptionsWhere<UserEntity>,
    order?: FindOptionsOrder<UserEntity>,
  ): Promise<Partial<UserEntity>[]> {
    return await this.userDao.getAllUsers(count, page, filters, order);
  }

  async getUsersByFilters(filters: UserData): Promise<Partial<UserEntity>[]> {
    return await this.userDao.findUsersByFilter(filters);
  }

  async getUserById(id: number): Promise<Partial<UserEntity> | null> {
    return await this.userDao.getUserById(id);
  }
}
