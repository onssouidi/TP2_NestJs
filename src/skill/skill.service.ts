import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { SKILL_ERROR_MESSAGES } from '../common/constants';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly SkillRepository: Repository<Skill>,
  ) {}


  async findAll():Promise<Skill[]>{
    return this.SkillRepository.find();
  }
  async create(createSkillDto: CreateSkillDto):Promise<Skill>{
    const skill=this.SkillRepository.create({
      ...createSkillDto,
  });
    return this.SkillRepository.save(skill);
  }

  async findOne(id:number):Promise<Skill>{
    const Skill=await this.SkillRepository.findOne({where:  {id}});
    if(!Skill)
     {throw new NotFoundException(SKILL_ERROR_MESSAGES.NOT_FOUND);}
  
    return Skill;

  }
 async update(id:number,updateSkilldoto:UpdateSkillDto):Promise<Skill>{
  const Skill=await this.findOne(id);
  if(!Skill)
  {
    throw new NotFoundException(SKILL_ERROR_MESSAGES.NOT_FOUND_UPDATE);
  }
  Object.assign(Skill,updateSkilldoto);
  return this.SkillRepository.save(Skill);
 }

 async delete(id:number):Promise<Skill>{
  const Skill=await this.findOne(id);
  if(!Skill)
  {
    throw new NotFoundException(SKILL_ERROR_MESSAGES.NOT_FOUND);
  }
  return this.SkillRepository.remove(Skill);
 }



}
