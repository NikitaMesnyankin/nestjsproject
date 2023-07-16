import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => {
        return {
          type: "postgres",
          database: configService.get<string>("DB_NAME"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASSWORD"),
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
