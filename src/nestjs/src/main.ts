import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Category } from '@fc/micro-videos/category/domain'

async function bootstrap() {
  const category = new Category({ name: 'Teste' });
  console.log('#######', category)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
