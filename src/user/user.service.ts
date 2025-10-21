import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

   async findAll():Promise<UserEntity[]>{
     return this.UserRepository.find();
   }
   async create(createUserDto: CreateUserDto):Promise<UserEntity>{
     const User=this.UserRepository.create({
       ...createUserDto,
   });
     return this.UserRepository.save(User);
   }
 
   async findOne(id:number):Promise<UserEntity>{
     const User=await this.UserRepository.findOne({where:  {id}});
     if(!User)
      {throw new NotFoundException("User not found !");}
   
     return User;
 
   }
  async update(id:number,updateUserdoto:UpdateUserDto):Promise<UserEntity>{
   const User=await this.findOne(id);
   if(!User)
   {
     throw new NotFoundException("User not found");
   }
   Object.assign(User,updateUserdoto);
   return this.UserRepository.save(User);
  }
 
  async delete(id:number):Promise<UserEntity>{
   const User=await this.findOne(id);
   if(!User)
   {
     throw new NotFoundException("User not found !");
   }
   return this.UserRepository.remove(User);
  }
 
 
 
 }
 