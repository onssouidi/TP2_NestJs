// src/commands/cv.seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';
import {
  randFullName,
  randJobTitle,
  randNumber,
  randUuid,
} from '@ngneat/falso';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);
  const userService = app.get(UserService);
  const skillService = app.get(SkillService);

  console.log('🌱 Seeding CVs...');

  const users = await userService.findAll();
  const skills = await skillService.findAll();

  for (let i = 0; i < 10; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomSkills = skills
      .sort(() => 0.5 - Math.random())
      .slice(0, randNumber({ min: 2, max: 5 }));

    await cvService.create({
      name: randFullName().split(' ')[0],
      firstname: randFullName().split(' ')[1],
      age: randNumber({ min: 20, max: 60 }),
      CIN: randNumber({ min: 10000000, max: 99999999 }),
      Job: randJobTitle(),
      path: `cv_${randUuid()}.pdf`,
      user: randomUser,
      skills: randomSkills,
    });
  }

  console.log('✅ CVs seeding completed!');
  await app.close();
}

bootstrap();
