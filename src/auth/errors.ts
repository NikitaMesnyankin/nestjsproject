import { HttpException } from "@nestjs/common";

export class WrongPassword extends HttpException {
  static message = "Wrong password";

  constructor() {
    super(
      {
        statusCode: 403,
        message: WrongPassword.message,
        error: "Bad request",
      },
      403,
    );
  }
}
