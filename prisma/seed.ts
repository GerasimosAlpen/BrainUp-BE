import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma/prisma.service';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const prisma = app.get(PrismaService);

  console.log('Seeding database...');

//seed dibawah sini

  await prisma.$disconnect();
  await app.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});