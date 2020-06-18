import { IEntity, Entity } from '../entity/entity';
import { DamageType } from '../damage-type/damage-type';
import { Biome } from '../biome/biome';
import { Essence } from '../essence/essence';
import { Rarity } from '../rarity/rarity';

export interface IIngredient extends IEntity {
    Name: string;
    Details?: string;
    RarityId?: number;
    // Essences: string[];
    // Locations: string[];
    DamageTypeId?: number;
    IncreaseHealing?: boolean;
    IncreaseArcaneRecovery?: boolean;
    IncreaseDamageNumber?: boolean;
    IncreaseDamageSize?: boolean;
    IncreaseSave?: boolean;
    DoubleDuration?: boolean;
    DoubleBombRadius?: boolean;
    DoubleDustArea?: boolean;
    ExtraOilUse?: boolean;
    DisadvantageDex?: boolean;
    DisadvantageCon?: boolean;
    DisadvantageWis?: boolean;
    DisadvantageSaves?: boolean;
    AddDamageTypeBomb?: boolean;
    AddDamageTypeDust?: boolean;
    AddDamageTypePoison?: boolean;
    AddDamageTypePotion?: boolean;
}
  

export class Ingredient extends Entity {
    name: string;
    details?: string = null;
    rarity?: Rarity = null;
    essences: Essence[] = [];
    locations: Biome[] = [];
    damageType?: DamageType = null;
    increaseHealing: boolean = false;
    increaseArcaneRecovery: boolean = false;
    increaseDamageNumber: boolean = false;
    increaseDamageSize: boolean = false;
    increaseSave: boolean = false;
    doubleDuration: boolean = false;
    doubleBombRadius: boolean = false;
    doubleDustArea: boolean = false;
    extraOilUse: boolean = false;
    disadvantageDex: boolean = false;
    disadvantageCon: boolean = false;
    disadvantageWis: boolean = false;
    disadvantageSaves: boolean = false;
    addDamageTypeBomb: boolean = false;
    addDamageTypeDust: boolean = false;
    addDamageTypePoison: boolean = false;
    addDamageTypePotion: boolean = false;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}