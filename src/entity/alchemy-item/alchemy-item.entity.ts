import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction.class';
import { Concoction } from 'src/app/shared/classes/concoction/concoction.class';
import { DamageType } from '../damage-type/damage-type.entity';


@Entity('AlchemyItems')
export class AlchemyItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => BaseConcoction)
    baseConcoction: BaseConcoction;

    @ManyToOne(type => Concoction)
    concoction: Concoction;

    @Column()
    dieType?: number;

    @Column()
    dieNumber?: number;
    
    @Column()
    DC?: number;

    @ManyToOne(type => DamageType)
    damageType?: DamageType;

    @Column()
    durationLength?: number;

    @Column()
    bombRadius?: number;

    @Column()
    dustArea?: number;
    
    @Column()
    oilUses?: number;

    @Column()
    disadvantageDex?: boolean;

    @Column()
    disadvantageCon?: boolean;
    
    @Column()
    disadvantageWis?: boolean;
    
    @Column()
    disadvantageSaves?: boolean;
    
    // constructor(id: number, { baseConcoction, bombRadius, dustArea, oilUses,
    //     concoction, dieType, dieNumber, DC,
    //     damageType, durationLength, disadvantageDex, disadvantageCon,
    //     disadvantageWis, disadvantageSaves }: CreateAlchemyItem){
    //     super(id);
    //     this.baseConcoction = baseConcoction;
    //     this.concoction = concoction;
    //     this.dieType = dieType;
    //     this.dieNumber = dieNumber;
    //     this.DC = DC;
    //     this.damageType = damageType;
    //     this.durationLength = durationLength;
    //     this.bombRadius = bombRadius;
    //     this.dustArea = dustArea;
    //     this.oilUses = oilUses;
    //     this.disadvantageDex = disadvantageDex;
    //     this.disadvantageCon = disadvantageCon;
    //     this.disadvantageWis = disadvantageWis;
    //     this.disadvantageSaves = disadvantageSaves;
    // }
}

// export interface IAlchemyItem extends IEntity {
//     BaseConcoctionName: string;
//     ConcoctionName: string;

//     DieType?: number;
//     DieNumber?: number;
//     DC?: number;
//     DamageTypeName?: string;
//     DurationLength?: number;

//     BombRadius?: number;
//     DustArea?: number;
//     OilUses?: number;

//     DisadvantageDex?: "true" | "false";
// 	DisadvantageCon?: "true" | "false";
// 	DisadvantageWis?: "true" | "false";
//     DisadvantageSaves?: "true" | "false";
// }

// export interface CreateAlchemyItem {
//     baseConcoction: BaseConcoction,
//     bombRadius?: number,
// 	dustArea?: number,
//     oilUses?: number,

//     concoction: Concoction,
//     dieType?: number,
// 	dieNumber?: number,
//     DC?: number,
//     damageType?: DamageType,
//     durationLength?: number,
    
//     disadvantageDex?: boolean,
// 	disadvantageCon?: boolean,
// 	disadvantageWis?: boolean,
//     disadvantageSaves?: boolean
// }