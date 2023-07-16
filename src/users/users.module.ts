import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UserDao } from "./dao/user-dao";
import { UserEntity } from "../entities/user.entity";
import { UserController } from "./user.controller";

@Module({
  providers: [UsersService, UserDao],
  exports: [UsersService, UserDao],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
})
export class UsersModule {}
