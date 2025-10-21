import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private readonly CVRepository:Repository<Cv>,){}
    

  async findAll():Promise<Cv[]>{
      return this.CVRepository.find();
    }
    async create(createcvDto: CreateCvDto):Promise<Cv>{
      const CV=this.CVRepository.create({
        ...createcvDto,
    });
      return this.CVRepository.save(CV);
    }
  
    async findOne(id:number):Promise<Cv>{
      const CV=await this.CVRepository.findOne({where:  {id}});
      if(!CV)
       {throw new NotFoundException("CV not found !");}
    
      return CV;
  
    }
   async update(id:number,updatecvdto:UpdateCvDto):Promise<Cv>{
    const CV=await this.findOne(id);
    if(!CV)
    {
      throw new NotFoundException("CV not found");
    }
    Object.assign(CV,updatecvdto);
    return this.CVRepository.save(CV);
   }
  
   async delete(id:number):Promise<Cv>{
    const CV=await this.findOne(id);
    if(!CV)
    {
      throw new NotFoundException("CV not found !");
    }
    return this.CVRepository.remove(CV);
   }
  
  
  
  }
  