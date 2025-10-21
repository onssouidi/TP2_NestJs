import { Cv } from 'src/cv/entities/cv.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
@Entity('Skill')
export class Skill {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    Designation:String;

    @ManyToMany(() => Cv, Cv => Cv.skills,{ cascade: ["insert", "update"],onDelete: 'CASCADE'})
       cvs:Cv[];
}
