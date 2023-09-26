import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { ReviewEntity } from "../../entities/review.entity";
import { FilmEntity } from "../../entities/film.entity";

@Injectable()
export class ReviewDao {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  async checkReviewExist(data: ReviewData): Promise<ReviewEntity | null> {
    return this.reviewRepository.findOne({
      where: [
        {
          id: data.id,
          authorId: data.authorId,
        },
      ],
    });
  }

  async createReview(
    data: ReviewData,
  ): Promise<
    ReviewEntity | { isAlreadyExist: boolean; isFilmNotFound: boolean }
  > {
    const foundFilm: FilmEntity = await this.filmRepository.findOne({
      where: {
        id: data.filmId,
      },
    });
    if (!foundFilm) {
      return {
        isFilmNotFound: true,
        isAlreadyExist: false,
      };
    }
    const foundReview: ReviewEntity = await this.reviewRepository.findOne({
      where: {
        filmId: data.filmId,
        authorId: data.authorId,
      },
    });
    if (foundReview) {
      return {
        isAlreadyExist: true,
        isFilmNotFound: false,
      };
    }
    const newReview: ReviewEntity = this.reviewRepository.create({
      authorId: data.authorId,
      filmId: data.filmId,
      content: data.content,
      score: data.score,
    });
    for (const prop in ReviewEntity) {
      if (ReviewEntity[prop] === undefined) {
        newReview[prop] = ReviewEntity[prop].default;
      }
    }
    await this.reviewRepository.save(newReview);
    return newReview;
  }
  // TODO: add review validation when published
  // async validateReview(review: ReviewEntity): Promise<ReviewEntity | null> {
  //   if (!review.isValidated) {
  //     review.isValidated = true;
  //     return this.reviewRepository.save(review);
  //   }
  //   return null;
  // }

  async findReviewsByFilter(
    reviewFilter: ReviewData,
  ): Promise<ReviewEntity[] | null> {
    const whereClause: FindOptionsWhere<ReviewEntity> = {};
    for (const filterKey in reviewFilter) {
      whereClause[filterKey] = reviewFilter[filterKey];
    }
    return this.reviewRepository.find({
      where: whereClause,
    });
  }

  async getAllReviews(
    count: number,
    page: number,
    order?: FindOptionsOrder<ReviewEntity>,
  ): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      take: count,
      skip: count * (page - 1),
      order,
    });
  }
}

export type ReviewData = Partial<ReviewEntity>;
