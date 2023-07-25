import { Injectable } from "@nestjs/common";
import { FilmDao, FilmData } from "./dao/film-dao";
import * as i from "../entities/interfaces";
import { FilmEntity } from "../entities/film.entity";
import { FilmAlreadyExists } from "./errors";

@Injectable()
export class FilmsService {
  constructor(private readonly filmDao: FilmDao) {}

  // async addFilm(filmData: FilmData): Promise<i.Interfaces.Film> {
  //   if (await this.filmDao.findFilmByFilter(filmData)) {
  //     throw new FilmAlreadyExists();
  //   }
  //   const filmCreationResult = await this.filmDao.createFilm(filmData);
  //   return {
  //     login: registrationResult.login,
  //     activationLink: registrationResult.activationLink,
  //     activationStatus: registrationResult.isActivated,
  //   };
  // }

  async getAllFilms(
    count: number,
    page: number,
  ): Promise<Partial<FilmEntity>[]> {
    return await this.filmDao.getAllFilms(count, page);
  }
}
