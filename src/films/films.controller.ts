import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { FilmsService } from "./films.service";
import * as i from "../entities/interfaces";
import { FilmDto, SearchFilmsFieldsDto } from "./dto/film-dto";

@Controller("/films")
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post("/")
  @HttpCode(201)
  async publish(@Body() body: FilmDto): Promise<i.Interfaces.Film> {
    return await this.filmsService.addFilm(body);
  }

  @Post("/search")
  @HttpCode(200)
  async getAllUsers(
    @Body() body: SearchFilmsFieldsDto,
  ): Promise<Partial<i.Interfaces.User>[]> {
    return await this.filmsService.getAllFilms(
      body.count,
      body.page,
      body.filters ?? {},
      body.order,
    );
  }
}
