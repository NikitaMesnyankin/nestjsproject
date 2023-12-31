import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import * as i from "./interfaces";
import { FilmEntity } from "./film.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: "reviews",
  synchronize: false,
  orderBy: { score: "DESC", createdAt: "DESC" },
})
export class ReviewEntity implements i.Interfaces.Review {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ name: "author_id", type: "integer", nullable: false })
  authorId: number;

  @Column({ name: "film_id", type: "integer", nullable: false })
  filmId: number;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "integer", nullable: false })
  score: number;

  @Column({ type: "integer", nullable: false, default: 0 })
  karma: number;

  @Column({
    name: "is_validated",
    type: "bool",
    nullable: false,
    default: false,
  })
  isValidated: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ name: "modified_at", type: "timestamp with time zone" })
  modifiedAt: string;

  @ManyToOne((type) => FilmEntity, (film) => film.reviews)
  @JoinColumn({ name: "film_id" })
  film: FilmEntity;

  @OneToOne((type) => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: "author_id" })
  user: UserEntity;
}
