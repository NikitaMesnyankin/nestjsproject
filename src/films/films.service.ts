import { Injectable } from "@nestjs/common";
import { FilmDao, FilmData } from "./dao/film-dao";
import { FilmEntity } from "../entities/film.entity";
import { FilmAlreadyExists } from "./errors";
import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

@Injectable()
export class FilmsService {
  constructor(private readonly filmDao: FilmDao) {}

  //TODO: add found film id return in error message to redirect client if creation failed
  async addFilm(filmData: FilmData): Promise<FilmEntity> {
    if ((await this.filmDao.findFilmsByFilter(filmData))?.length) {
      throw new FilmAlreadyExists();
    }
    return await this.filmDao.createFilm(filmData);
  }

  async getAllFilms(
    count: number,
    page: number,
    filters?: FindOptionsWhere<FilmEntity>,
    order?: FindOptionsOrder<FilmEntity>,
  ): Promise<Partial<FilmEntity>[]> {
    return await this.filmDao.getAllFilms(count, page, filters, order);
  }
}
