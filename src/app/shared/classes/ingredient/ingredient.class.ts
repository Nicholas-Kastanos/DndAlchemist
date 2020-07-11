import { Biome } from '../biome/biome.class';
import { DamageType } from '../damage-type/damage-type.class';
import { IEntity } from '../entity/entity.class';
import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
import { Essence } from '../essence/essence.class';
import { Rarity } from '../rarity/rarity.class';

export interface IIngredient extends INamedEntity {
	Details?: string;
	RarityId?: number;
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
	AddDamageTypeOil?: boolean;
	AddDamageTypePotion?: boolean;
}

export interface IIngredientImport {
	name: string;
	details: string | undefined;
	rarity: string | undefined;
	essences: string[];
	locations: string[];
	damageType: string | undefined;
	increaseHealing: boolean | undefined;
	increaseArcaneRecovery: boolean | undefined;
	increaseDamageNumber: boolean | undefined;
	increaseDamageSize: boolean | undefined;
	increaseSave: boolean | undefined;
	doubleDuration: boolean | undefined;
	doubleBombRadius: boolean | undefined;
	doubleDustArea: boolean | undefined;
	extraOilUse: boolean | undefined;
	disadvantageDex: boolean | undefined;
	disadvantageCon: boolean | undefined;
	disadvantageWis: boolean | undefined;
	disadvantageSaves: boolean | undefined;
	addDamageTypeBomb: boolean | undefined;
	addDamageTypeDust: boolean | undefined;
	addDamageTypeOil: boolean | undefined;
	addDamageTypePotion: boolean | undefined;
}


export class Ingredient extends NamedEntity {
	static tableName: string = "Ingredients";
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
	addDamageTypeOil: boolean = false;
	addDamageTypePotion: boolean = false;

	constructor(
		id: number,
		name: string,
		essences: Essence[],
		locations: Biome[],
		details?: string,
		rarity?: Rarity,
		damageType?: DamageType,
		increaseHealing?: boolean,
		increaseArcaneRecovery?: boolean,
		increaseDamageNumber?: boolean,
		increaseDamageSize?: boolean,
		increaseSave?: boolean,
		doubleDuration?: boolean,
		doubleBombRadius?: boolean,
		doubleDustArea?: boolean,
		extraOilUse?: boolean,
		disadvantageDex?: boolean,
		disadvantageCon?: boolean,
		disadvantageWis?: boolean,
		disadvantageSaves?: boolean,
		addDamageTypeBomb?: boolean,
		addDamageTypeDust?: boolean,
		addDamageTypeOil?: boolean,
		addDamageTypePotion?: boolean,
	) {
		super(id, name);
		this.details = details;
		this.rarity = rarity;
		this.essences = essences;
		this.locations = locations;
		this.damageType = damageType;
		this.increaseHealing = increaseHealing ?? this.increaseHealing;
		this.increaseArcaneRecovery = increaseArcaneRecovery ?? this.increaseArcaneRecovery;
		this.increaseDamageNumber = increaseDamageNumber ?? this.increaseDamageNumber;
		this.increaseDamageSize = increaseDamageSize ?? this.increaseDamageSize;
		this.increaseSave = increaseSave ?? this.increaseSave;
		this.doubleDuration = doubleDuration ?? this.doubleDuration;
		this.doubleBombRadius = doubleBombRadius ?? this.doubleBombRadius;
		this.doubleDustArea = doubleDustArea ?? this.doubleDustArea;
		this.extraOilUse = extraOilUse ?? this.extraOilUse;
		this.disadvantageDex = disadvantageDex ?? this.disadvantageDex;
		this.disadvantageCon = disadvantageCon ?? this.disadvantageCon;
		this.disadvantageWis = disadvantageWis ?? this.disadvantageWis;
		this.disadvantageSaves = disadvantageSaves ?? this.disadvantageSaves;
		this.addDamageTypeBomb = addDamageTypeBomb ?? this.addDamageTypeBomb;
		this.addDamageTypeDust = addDamageTypeDust ?? this.addDamageTypeDust;
		this.addDamageTypeOil = addDamageTypeOil ?? this.addDamageTypeOil;
		this.addDamageTypePotion = addDamageTypePotion ?? this.addDamageTypePotion;
	}
}

export interface IIngredientEssence extends IEntity {
	IngredientId: number;
	EssenceId: number;
}

export interface IIngredientBiome extends IEntity {
	IngredientId: number;
	BiomeId: number;
}