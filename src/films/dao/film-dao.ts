import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { FilmEntity } from "../../entities/film.entity";

@Injectable()
export class FilmDao {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  async createFilm(data: FilmData): Promise<FilmEntity> {
    const newFilm: FilmEntity = this.filmRepository.create({
      author: data.author,
      description: data.description,
      country: data.country,
      name: data.name,
    });
    for (const prop in FilmEntity) {
      if (newFilm[prop] === undefined) {
        newFilm[prop] = FilmEntity[prop].default;
      }
    }
    await this.filmRepository.save(newFilm);
    return newFilm;
  }

  async findFilmsByFilter(filmFilter: FilmData): Promise<FilmEntity[] | null> {
    const whereClause: FindOptionsWhere<FilmEntity> = {};
    for (const filterKey in filmFilter) {
      whereClause[filterKey] = filmFilter[filterKey];
    }
    return this.filmRepository.find({
      where: whereClause,
    });
  }

  async getAllFilms(
    count: number,
    page: number,
    filters?: FindOptionsWhere<FilmEntity>,
    order?: FindOptionsOrder<FilmEntity>,
  ): Promise<FilmEntity[]> {
    return this.filmRepository.find({
      take: count,
      skip: count * (page - 1),
      relations: {
        reviews: true,
      },
      where: filters,
      order,
    });
  }
}

export type FilmData = Partial<FilmEntity>;
