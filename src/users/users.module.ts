import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UserDao } from "./dao/user-dao";
import { UserEntity } from "../entities/user.entity";
import { UsersController } from "./users.controller";
import { MailerModule } from "../mailer/mailer.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [UsersService, UserDao, JwtService],
  exports: [UsersService, UserDao],
  imports: [TypeOrmModule.forFeature([UserEntity]), MailerModule],
  controllers: [UsersController],
})
export class UsersModule {}
