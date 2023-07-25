import { HttpException } from "@nestjs/common";

export class FilmAlreadyExists extends HttpException {
  static message = "Film with requested data already exists.";

  constructor() {
    super(
      {
        statusCode: 400,
        message: FilmAlreadyExists.message,
        error: "Bad request",
      },
      400,
    );
  }
}

export class FilmNotFound extends HttpException {
  static message = "Film with requested data not found.";

  constructor() {
    super(
      {
        statusCode: 404,
        message: FilmNotFound.message,
        error: "Not found",
      },
      404,
    );
  }
}
