import {
  Body,
  Controller,
  HttpCode,
  Post,
  Patch,
  UseGuards,
  Param,
  Request,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import * as i from "../entities/interfaces";
import { ReviewDto, SearchReviewsFieldsDto } from "./dto/review-dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles, RolesGuard } from "../auth/guards/roles.guard";

@Controller("/reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("/")
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async publish(@Body() body: ReviewDto): Promise<i.Interfaces.Review> {
    return await this.reviewsService.addReview(body);
  }

  @UseGuards(RolesGuard)
  @Roles("USER", "REVIEWER", "ADMIN")
  @Post("/search")
  @HttpCode(200)
  async getAllReviews(
    @Body() body: SearchReviewsFieldsDto,
    @Request() request,
  ): Promise<i.Interfaces.Review[]> {
    return await this.reviewsService.getAllReviews(
      body.count,
      body.page,
      !request.role || request.role === "USER" ? { isValidated: true } : {},
      body.order,
    );
  }

  @Patch(":id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "REVIEWER")
  async validateReview(@Param("id") id: number) {
    return await this.reviewsService.validateReview(id);
  }
}
