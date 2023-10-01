import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { ReviewEntity } from "../../entities/review.entity";
import { FilmEntity } from "../../entities/film.entity";
import { UserEntity } from "../../entities/user.entity";

@Injectable()
export class ReviewDao {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

  async createReview(data: ReviewData): Promise<
    | ReviewEntity
    | {
        isAlreadyExist: boolean;
        isFilmNotFound: boolean;
        isUserNotFound: boolean;
      }
  > {
    const foundUser: UserEntity = await this.userRepository.findOne({
      where: {
        id: data.authorId,
      },
    });
    if (!foundUser) {
      return {
        isFilmNotFound: false,
        isAlreadyExist: false,
        isUserNotFound: true,
      };
    }
    const foundFilm: FilmEntity = await this.filmRepository.findOne({
      where: {
        id: data.filmId,
      },
      relations: {
        reviews: true,
      },
    });
    if (!foundFilm) {
      return {
        isFilmNotFound: true,
        isAlreadyExist: false,
        isUserNotFound: false,
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
        isUserNotFound: false,
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
    filter?: FindOptionsWhere<ReviewEntity>,
    order?: FindOptionsOrder<ReviewEntity>,
  ): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      take: count,
      skip: count * (page - 1),
      where: filter,
      order,
    });
  }

  async validateReview(reviewId: number): Promise<ReviewEntity | null> {
    const foundReview = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
    });
    if (!foundReview) {
      return null;
    }
    if (foundReview.isValidated) {
      return null;
    }
    const foundFilm = await this.filmRepository.findOne({
      where: {
        id: foundReview.filmId,
      },
      relations: {
        reviews: true,
      },
    });
    if (!foundFilm) {
      return null;
    }
    foundFilm.averageRating = parseFloat(
      (
        foundFilm.reviews.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.score;
        }, 0) / foundFilm.reviews.length
      ).toFixed(4),
    );
    await this.filmRepository.save(foundFilm);
    foundReview.isValidated = true;
    await this.reviewRepository.save(foundReview);
    return foundReview;
  }
}

export type ReviewData = Partial<ReviewEntity>;
