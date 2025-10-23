import { Skill } from 'src/skill/entities/skill.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, ManyToOne, JoinTable} from 'typeorm';
@Entity('CV')
export class Cv {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    firstname:String;

    @Column()
    age:number

    @Column()
    CIN:number;

    @Column()
    Job:String;

    @Column()
    path:String

   @ManyToMany(() => Skill, skill => skill.cvs,{ cascade: ["insert", "update"],eager:true})
   @JoinTable()
   skills:Skill[];

   @ManyToOne(() => UserEntity, user => user.cvs,{cascade: ["insert", "update"]})
   user :UserEntity;

}


