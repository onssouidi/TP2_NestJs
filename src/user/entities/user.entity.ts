import { Cv } from 'src/cv/entities/cv.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from 'typeorm';

@Entity('user')
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string; 

  @Column()
  email: string;

  @Column()
  password: string;

@OneToMany(() => Cv, cv => cv.user,{ cascade: ["insert", "update"],eager:true,onDelete: 'CASCADE' })
 cvs: Cv[];
}