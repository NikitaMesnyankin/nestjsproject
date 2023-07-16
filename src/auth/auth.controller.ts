import { Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}
}
