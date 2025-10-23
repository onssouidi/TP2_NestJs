// src/commands/skill.seeder.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const skillService = app.get(SkillService);

  console.log('🌱 Seeding Skills...');

  const skills = [
    'JavaScript',
    'TypeScript',
    'Python',
    'NestJS',
    'Docker',
    'Kubernetes',
    'AWS',
    'Linux',
    'SQL',
    'Networking',
  ];

  for (const s of skills) {
    await skillService.create({
      Designation: s,
    });
  }

  console.log('✅ Skills seeding completed!');
  await app.close();
}

bootstrap();
