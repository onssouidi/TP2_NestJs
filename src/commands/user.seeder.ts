// src/commands/user.seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { randFullName, randEmail, randPassword } from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  console.log('🌱 Seeding Users...');

  for (let i = 0; i < 5; i++) {
    await userService.create({
      username: randFullName(),
      email: randEmail(),
      password: randPassword(),
    });
  }

  console.log('✅ Users seeding completed!');
  await app.close();
}

bootstrap();
