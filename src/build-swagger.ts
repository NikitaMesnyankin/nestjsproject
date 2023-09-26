import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { getSwaggerDocument } from "./swagger";

async function main() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  const document = getSwaggerDocument(app, configService);
  fs.writeFileSync(`${__dirname}/../../swagger.json`, JSON.stringify(document));

  await app.close();
}

main().then(() => console.log("Done"));
