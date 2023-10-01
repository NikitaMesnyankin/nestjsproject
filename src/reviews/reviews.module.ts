import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsService } from "./reviews.service";
import { ReviewDao } from "./dao/review-dao";
import { ReviewEntity } from "../entities/review.entity";
import { ReviewsController } from "./reviews.controller";
import { FilmEntity } from "../entities/film.entity";
import { UserEntity } from "../entities/user.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [ReviewsService, ReviewDao, JwtService],
  exports: [ReviewsService, ReviewDao],
  imports: [TypeOrmModule.forFeature([ReviewEntity, FilmEntity, UserEntity])],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
