import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilmsService } from "./films.service";
import { FilmDao } from "./dao/film-dao";
import { FilmEntity } from "../entities/film.entity";
import { FilmsController } from "./films.controller";

@Module({
  providers: [FilmsService, FilmDao],
  exports: [FilmsService, FilmDao],
  imports: [TypeOrmModule.forFeature([FilmEntity])],
  controllers: [FilmsController],
})
export class FilmsModule {}
