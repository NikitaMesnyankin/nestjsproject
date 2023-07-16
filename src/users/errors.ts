import { HttpException } from "@nestjs/common";

export class UserAlreadyExists extends HttpException {
  static message = "User with requested data already exists.";

  constructor() {
    super(
      {
        statusCode: 400,
        message: UserAlreadyExists.message,
        error: "Bad request",
      },
      400,
    );
  }
}

export class UserNotFound extends HttpException {
  static message = "User with requested data not found.";

  constructor() {
    super(
      {
        statusCode: 404,
        message: UserNotFound.message,
        error: "Not found",
      },
      404,
    );
  }
}

export class ActivationLinkAlreadyUsed extends HttpException {
  static message = "Activation link already used.";

  constructor() {
    super(
      {
        statusCode: 409,
        message: ActivationLinkAlreadyUsed.message,
        error: "Conflict",
      },
      409,
    );
  }
}
