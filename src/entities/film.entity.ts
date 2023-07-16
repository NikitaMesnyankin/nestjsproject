import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import * as i from "./interfaces";

@Entity({
  name: "films",
  synchronize: false,
  orderBy: { averageRating: "DESC", createdAt: "DESC" },
})
export class FilmEntity implements i.Interfaces.Film {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "text", nullable: false, unique: true })
  name: string;

  @Column({
    type: "enum",
    nullable: false,
    enum: i.Interfaces.Countries,
    default: i.Interfaces.Countries.UNK,
  })
  country: i.Interfaces.Countries;

  @Column({ type: "varchar", nullable: false })
  author: string;

  @Column({ name: "avg_rating", type: "float", nullable: false, default: 0.0 })
  averageRating: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ name: "modified_at", type: "timestamp with time zone" })
  modifiedAt: string;
}
