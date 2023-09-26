import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { UserEntity } from "../../entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserDao {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async checkUserExistsByLoginOrEmail(
    data: UserData,
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: [
        {
          email: data.email,
        },
        {
          login: data.login,
        },
      ],
    });
  }

  async createUser(data: UserData): Promise<UserEntity> {
    const newUser: UserEntity = this.userRepository.create({
      login: data.login,
      email: data.email,
      password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
    });
    for (const prop in UserEntity) {
      if (newUser[prop] === undefined) {
        newUser[prop] = UserEntity[prop].default;
      }
    }
    await this.userRepository.save(newUser);
    return newUser;
  }

  async activateUser(user: UserEntity): Promise<UserEntity | null> {
    if (!user.isActivated) {
      user.isActivated = true;
      user.activationLink = null;
      return this.userRepository.save(user);
    }
    return null;
  }

  async findUsersByFilter(userFilter: UserData): Promise<UserEntity[]> {
    const whereClause: FindOptionsWhere<UserEntity> = {};
    for (const filterKey in userFilter) {
      whereClause[filterKey] = userFilter[filterKey];
    }
    return this.userRepository.find({
      where: whereClause,
    });
  }

  async getAllUsers(
    count: number,
    page: number,
    order?: FindOptionsOrder<UserEntity>,
  ): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ["id", "nickname", "rating", "about", "role"],
      take: count,
      skip: count * (page - 1),
      order,
    });
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      id,
    });
  }
}

export type UserData = Partial<UserEntity>;
