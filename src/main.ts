import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule } from "@nestjs/swagger";
import { getSwaggerDocument } from "./swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3006",
    ],
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  if (configService.get("SWAGGER_ACTIVE") === "true") {
    SwaggerModule.setup(
      "api-docs",
      app,
      getSwaggerDocument(app, configService),
    );
  }

  await app.listen(3000);
}
bootstrap();
