import { Injectable } from "@nestjs/common";
import { ReviewData, ReviewDao } from "./dao/review-dao";
import { ReviewEntity } from "../entities/review.entity";
import { ReviewAlreadyExists } from "./errors";
import { FilmNotFound } from "../films/errors";

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewDao: ReviewDao) {}

  //TODO: add found film id return in error message to redirect client if creation failed
  async addReview(reviewData: ReviewData): Promise<ReviewEntity> {
    if ((await this.reviewDao.findReviewsByFilter(reviewData))?.length) {
      throw new ReviewAlreadyExists();
    }
    const createdReview = await this.reviewDao.createReview(reviewData);
    if (!(createdReview instanceof ReviewEntity)) {
      if (createdReview.isFilmNotFound) {
        throw new FilmNotFound();
      }
      if (createdReview.isAlreadyExist) {
        throw new ReviewAlreadyExists();
      }
    } else {
      return createdReview;
    }
  }

  async getAllReviews(
    count: number,
    page: number,
  ): Promise<Partial<ReviewEntity>[]> {
    return await this.reviewDao.getAllReviews(count, page);
  }
}
