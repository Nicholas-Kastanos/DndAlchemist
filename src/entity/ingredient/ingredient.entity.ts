// import { Biome } from '../biome/biome.class';
// import { DamageType } from '../damage-type/damage-type.class';
// import { IEntity } from '../entity/entity.class';
// import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
// import { Essence } from '../essence/essence.class';
// import { Rarity } from '../rarity/rarity.class';

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Essence } from '../essence/essence.entity';
import { Rarity } from '../rarity/rarity.entity';
import { Biome } from '../biome/biome.entity';
import { DamageType } from '../damage-type/damage-type.entity';

// // Booleans from database are handled as "true" and "false" string literals https://github.com/xpbrew/cordova-sqlite-storage
// export interface IIngredient extends INamedEntity {
// 	Details?: string;
// 	RarityName?: string;
// 	DamageTypeName?: string;
// 	IncreaseHealing: "true" | "false";
// 	IncreaseArcaneRecovery: "true" | "false";
// 	IncreaseDamageNumber: "true" | "false";
// 	IncreaseDamageSize: "true" | "false";
// 	IncreaseSave: "true" | "false";
// 	DoubleDuration: "true" | "false";
// 	DoubleBombRadius: "true" | "false";
// 	DoubleDustArea: "true" | "false";
// 	ExtraOilUse: "true" | "false";
// 	DisadvantageDex: "true" | "false";
// 	DisadvantageCon: "true" | "false";
// 	DisadvantageWis: "true" | "false";
// 	DisadvantageSaves: "true" | "false";
// }

// export interface IIngredientImport {
// 	name: string;
// 	details: string | undefined;
// 	rarity: string | undefined;
// 	essences: string[];
// 	locations: string[];
// 	damageType: string | undefined;
// 	increaseHealing: boolean | undefined;
// 	increaseArcaneRecovery: boolean | undefined;
// 	increaseDamageNumber: boolean | undefined;
// 	increaseDamageSize: boolean | undefined;
// 	increaseSave: boolean | undefined;
// 	doubleDuration: boolean | undefined;
// 	doubleBombRadius: boolean | undefined;
// 	doubleDustArea: boolean | undefined;
// 	extraOilUse: boolean | undefined;
// 	disadvantageDex: boolean | undefined;
// 	disadvantageCon: boolean | undefined;
// 	disadvantageWis: boolean | undefined;
// 	disadvantageSaves: boolean | undefined;
// 	addDamageTypeBomb: boolean | undefined;
// 	addDamageTypeDust: boolean | undefined;
// 	addDamageTypeOil: boolean | undefined;
// 	addDamageTypePotion: boolean | undefined;
// }

@Entity('Ingredients')
export class Ingredient{

	@PrimaryColumn({type: "nvarchar", length: 100})
	name: string

	@Column()
	details?: string

	@ManyToOne(type => Rarity)
	rarity?: Rarity

	@OneToMany(type => IngredientEssence, ingredientEssence => ingredientEssence.ingredient)
	essences: Essence[]

	@OneToMany(type => IngredientBiome, ingredientBiome => ingredientBiome.ingredient)
	biomes: IngredientBiome[]

	@ManyToOne(type => DamageType)
	damageType?: DamageType

	@Column()
	increaseHealing: boolean

	@Column()
	increaseArcaneRecovery: boolean

	@Column()
	increaseDamageNumber: boolean

	@Column()
	increaseDamageSize: boolean

	@Column()
	increaseSave: boolean

	@Column()
	doubleDuration: boolean

	@Column()
	doubleBombRadius: boolean

	@Column()
	doubleDustArea: boolean

	@Column()
	extraOilUse: boolean

	@Column()
	disadvantageDex: boolean

	@Column()
	disadvantageCon: boolean

	@Column()
	disadvantageWis: boolean

	@Column()
	disadvantageSaves: boolean
}

// export class Ingredient extends NamedEntity {
// 	details?: string;
// 	rarity?: Rarity;
// 	essences: Essence[] = [];
// 	locations: Biome[] = [];
// 	damageType?: DamageType;
// 	increaseHealing: boolean;
// 	increaseArcaneRecovery: boolean;
// 	increaseDamageNumber: boolean;
// 	increaseDamageSize: boolean;
// 	increaseSave: boolean;
// 	doubleDuration: boolean;
// 	doubleBombRadius: boolean;
// 	doubleDustArea: boolean;
// 	extraOilUse: boolean;
// 	disadvantageDex: boolean;
// 	disadvantageCon: boolean;
// 	disadvantageWis: boolean;
// 	disadvantageSaves: boolean;

// 	constructor(
// 		name: string,
// 		essences: Essence[],
// 		locations: Biome[],
// 		increaseHealing: "true" | "false",
// 		increaseArcaneRecovery: "true" | "false",
// 		increaseDamageNumber: "true" | "false",
// 		increaseDamageSize: "true" | "false",
// 		increaseSave: "true" | "false",
// 		doubleDuration: "true" | "false",
// 		doubleBombRadius: "true" | "false",
// 		doubleDustArea: "true" | "false",
// 		extraOilUse: "true" | "false",
// 		disadvantageDex: "true" | "false",
// 		disadvantageCon: "true" | "false",
// 		disadvantageWis: "true" | "false",
// 		disadvantageSaves: "true" | "false",
// 		details?: string,
// 		rarity?: Rarity,
// 		damageType?: DamageType,
// 	) {
// 		super(name);
// 		this.details = details;
// 		this.rarity = rarity;
// 		this.essences = essences;
// 		this.locations = locations;
// 		this.damageType = damageType;
// 		this.increaseHealing = increaseHealing === "true";
// 		this.increaseArcaneRecovery = increaseArcaneRecovery === "true";
// 		this.increaseDamageNumber = increaseDamageNumber === "true";
// 		this.increaseDamageSize = increaseDamageSize === "true";
// 		this.increaseSave = increaseSave === "true";
// 		this.doubleDuration = doubleDuration === "true";
// 		this.doubleBombRadius = doubleBombRadius === "true";
// 		this.doubleDustArea = doubleDustArea === "true";
// 		this.extraOilUse = extraOilUse === "true";
// 		this.disadvantageDex = disadvantageDex === "true";
// 		this.disadvantageCon = disadvantageCon === "true";
// 		this.disadvantageWis = disadvantageWis === "true";
// 		this.disadvantageSaves = disadvantageSaves === "true";
// 	}
// }

@Entity('IngredientEssences')
export class IngredientEssence {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Ingredient, ingredient => ingredient.essences)
	ingredient: Ingredient;

	@ManyToOne(type => Essence)
	essence: Essence;
}

// export interface IIngredientEssence extends IEntity {
// 	IngredientName: string;
// 	EssenceName: string;
// }

@Entity('IngredientBiomes')
export class IngredientBiome {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Ingredient, ingredient => ingredient.biomes)
	ingredient: Ingredient;

	@ManyToOne(type => Biome)
	biome: Biome;
}

// export interface IIngredientBiome extends IEntity {
// 	IngredientName: string;
// 	BiomeName: string;
// }