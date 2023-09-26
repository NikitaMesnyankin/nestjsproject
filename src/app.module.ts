import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { DatabaseModule } from "./database/database.module";
import { FilmsModule } from "./films/films.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { AuthModule } from "./auth/auth.module";
import { MailerModule } from "./mailer/mailer.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
    FilmsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
