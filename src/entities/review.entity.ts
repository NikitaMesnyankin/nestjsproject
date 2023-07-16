import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import * as i from "./interfaces";

@Entity()
export class ReviewEntity implements i.Interfaces.Review {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ name: "author_id", type: "integer", nullable: false })
  authorId: number;

  @Column({ name: "film_id", type: "integer", nullable: false })
  filmId: number;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ type: "float", nullable: false, default: 0.0 })
  score: number;

  @Column({ type: "integer", nullable: false, default: 0 })
  karma: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ name: "modified_at", type: "timestamp with time zone" })
  modifiedAt: string;
}
