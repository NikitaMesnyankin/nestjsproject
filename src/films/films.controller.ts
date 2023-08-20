import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { FilmsService } from "./films.service";
import * as i from "../entities/interfaces";
import { FilmDto } from "./dto/film-dto";
import { PaginationDto } from "../helpers/dto";

@Controller("/films")
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post("/")
  @HttpCode(201)
  async publish(@Body() body: FilmDto): Promise<i.Interfaces.Film> {
    return await this.filmsService.addFilm(body);
  }

  @Get()
  @HttpCode(200)
  async getAllUsers(
    @Query() query: PaginationDto,
  ): Promise<Partial<i.Interfaces.User>[]> {
    return await this.filmsService.getAllFilms(query.count, query.page);
  }
}
