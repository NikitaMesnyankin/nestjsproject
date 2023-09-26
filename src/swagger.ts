import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

let document;

export function getSwaggerDocument(app?, configService?: ConfigService) {
  if (document) {
    return document;
  }

  const config = new DocumentBuilder()
    .setTitle("Reviewfy API")
    .setDescription("Documentation for reviewfy api")
    .setVersion("1.0")
    .addServer(configService.get("BASE_URL"), configService.get("NAMESPACE"))
    .build();

  document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey, methodKey) => methodKey,
  });
  return document;
}
