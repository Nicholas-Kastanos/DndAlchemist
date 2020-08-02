import { Entity, IEntity } from '../entity/entity.class';
import { BaseConcoction } from '../base-concoction/base-concoction.class';
import { Concoction } from '../concoction/concoction.class';
import { DamageType } from '../damage-type/damage-type.class';

export class AlchemyItem extends Entity {
    static tableName: string = "AlchemyItem";

    baseConcoction: BaseConcoction;
    concoction: Concoction;

    dieType?: number;
	dieNumber?: number;
    DC?: number;
    damageType?: DamageType;
    durationLength?: number;

    bombRadius?: number;
	dustArea?: number;
    oilUses?: number;
    
    disadvantageDex?: boolean;
	disadvantageCon?: boolean;
	disadvantageWis?: boolean;
    disadvantageSaves?: boolean;
    
    constructor(id: number, { baseConcoction, bombRadius, dustArea, oilUses,
        concoction, dieType, dieNumber, DC,
        damageType, durationLength, disadvantageDex, disadvantageCon,
        disadvantageWis, disadvantageSaves }: CreateAlchemyItem){
        super(id);
        this.baseConcoction = baseConcoction;
        this.concoction = concoction;
        this.dieType = dieType;
        this.dieNumber = dieNumber;
        this.DC = DC;
        this.damageType = damageType;
        this.durationLength = durationLength;
        this.bombRadius = bombRadius;
        this.dustArea = dustArea;
        this.oilUses = oilUses;
        this.disadvantageDex = disadvantageDex;
        this.disadvantageCon = disadvantageCon;
        this.disadvantageWis = disadvantageWis;
        this.disadvantageSaves = disadvantageSaves;
    }
}

export interface IAlchemyItem extends IEntity {
    BaseConcoctionName: string;
    ConcoctionName: string;

    DieType?: number;
    DieNumber?: number;
    DC?: number;
    DamageTypeName?: string;
    DurationLength?: number;

    BombRadius?: number;
    DustArea?: number;
    OilUses?: number;

    DisadvantageDex?: "true" | "false";
	DisadvantageCon?: "true" | "false";
	DisadvantageWis?: "true" | "false";
    DisadvantageSaves?: "true" | "false";
}

export interface CreateAlchemyItem {
    baseConcoction: BaseConcoction,
    bombRadius?: number,
	dustArea?: number,
    oilUses?: number,

    concoction: Concoction,
    dieType?: number,
	dieNumber?: number,
    DC?: number,
    damageType?: DamageType,
    durationLength?: number,
    
    disadvantageDex?: boolean,
	disadvantageCon?: boolean,
	disadvantageWis?: boolean,
    disadvantageSaves?: boolean
}