import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import * as i from "./interfaces";

@Entity({ name: "users", synchronize: true })
export class UserEntity implements i.Interfaces.User {
  @PrimaryGeneratedColumn("increment", { type: "integer" })
  id: number;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  login: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  password: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({
    name: "is_activated",
    type: "boolean",
    default: false,
    nullable: false,
  })
  isActivated: boolean;

  @Column({
    type: "enum",
    enum: i.Interfaces.Roles,
    default: i.Interfaces.Roles.USER,
  })
  role: i.Interfaces.Roles;

  @Column({
    name: "activation_link",
    type: "uuid",
    nullable: true,
    //default: "gen_random_uuid()",
    generated: "uuid",
  })
  activationLink: string;

  @Column({
    type: "varchar",
    length: 50,
    generatedIdentity: "ALWAYS",
    generatedType: "STORED",
    asExpression: "(login)",
    nullable: false,
  })
  nickname: string;

  @Column({ type: "float", default: 0.0, nullable: false })
  rating: number;

  @Column({ type: "text", nullable: true, default: null })
  about: string;

  @Column({})
  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  createdAt: string;

  @UpdateDateColumn({ name: "modified_at", type: "timestamp with time zone" })
  modifiedAt: string;
}
