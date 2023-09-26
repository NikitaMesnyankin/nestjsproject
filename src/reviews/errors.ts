import { HttpException } from "@nestjs/common";

export class ReviewAlreadyExists extends HttpException {
  static message = "Review with requested data already exists.";

  constructor() {
    super(
      {
        statusCode: 400,
        message: ReviewAlreadyExists.message,
        error: "Bad request",
      },
      400,
    );
  }
}

export class ReviewNotFound extends HttpException {
  static message = "Film with requested data not found.";

  constructor() {
    super(
      {
        statusCode: 404,
        message: ReviewNotFound.message,
        error: "Not found",
      },
      404,
    );
  }
}
