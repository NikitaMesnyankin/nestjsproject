import { Body, Controller, Get, HttpCode, Post, Query } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import * as i from "../entities/interfaces";
import { ReviewDto } from "./dto/review-dto";
import { PaginationDto } from "../helpers/dto";

@Controller("/reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post("/")
  @HttpCode(201)
  async publish(@Body() body: ReviewDto): Promise<i.Interfaces.Review> {
    return await this.reviewsService.addReview(body);
  }

  @Get()
  @HttpCode(200)
  async getAllReviews(
    @Query() query: PaginationDto,
  ): Promise<Partial<i.Interfaces.Review>[]> {
    return await this.reviewsService.getAllReviews(query.count, query.page);
  }
}
