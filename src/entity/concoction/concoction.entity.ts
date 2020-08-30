import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, ManyToMany, PrimaryColumn, OneToMany } from 'typeorm';
import { Ingredient } from '../ingredient/ingredient.entity';
import { Essence } from '../essence/essence.entity';
import { SaveType } from '../save-type/save-type.entity';
import { DamageType } from '../damage-type/damage-type.entity';

// export interface IConcoction extends INamedEntity {
// 	DieType?: number;
// 	DieNumber?: number;
// 	DC?: number;
// 	SaveTypeName?: string;
// 	DamageTypeName?: string;
// 	Effect: string;
// 	DurationLength?: number;
// 	DurationType?: string;
// }

// export interface IConcoctionImport {
// 	name: string;
// 	dieType: number | undefined;
// 	dieNumber: number | undefined;
// 	DC: number | undefined;
// 	save: string | undefined;
// 	damageType: string | undefined;
// 	essences: string[];
// 	requiredIngredients: string[];
// 	effect: string;
// 	durationLength: number | undefined;
// 	durationType: number | undefined;
// }



export class Concoction {

	@PrimaryColumn()
	name: string;

	@Column()
	dieType?: number;

	@Column()
	dieNumber?: number;

	@Column()
	DC?: number;

	@ManyToOne(type => SaveType)
	saveType?: SaveType;

	@ManyToOne(type => DamageType)
	damageType?: DamageType;

	@OneToMany(type => ConcoctionEssence, concoctionEssence => concoctionEssence.concoction)
	essences: ConcoctionEssence[];

	@OneToMany(type => ConcoctionIngredient, concoctionIngredient => concoctionIngredient.concoction)
	requiredIngredients: ConcoctionIngredient[];

	@Column()
	effect: string;

	@Column()
	durationLength?: number;

	@Column()
	durationType?: string;

	// constructor(
	// 	name: string,
	// 	effect: string,
	// 	essences: Essence[],
	// 	requiredIngredients: ConcoctionIngredient[],
	// 	dieType?: number,
	// 	dieNumber?: number,
	// 	DC?: number,
	// 	saveType?: SaveType,
	// 	damageType?: DamageType,
	// 	durationLength?: number,
	// 	durationType?: string,
	// ) {
	// 	super(name);
	// 	this.effect = effect;
	// 	this.essences = essences;
	// 	this.requiredIngredients = requiredIngredients;
	// 	this.dieType = dieType;
	// 	this.dieNumber = dieNumber;
	// 	this.DC = DC;
	// 	this.saveType = saveType;
	// 	this.damageType = damageType;
	// 	this.durationLength = durationLength;
	// 	this.durationType = durationType;
	// }
}

// export interface IConcoctionEssence extends IEntity {
// 	ConcoctionName: string;
// 	EssenceName: string;
// }

@Entity('ConcoctionEssences')
export class ConcoctionEssence{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Concoction, concoction => concoction.essences)
	concoction: Concoction;

	@ManyToOne(type => Essence)
	essence: Essence;
}

// export interface IConcoctionIngredient extends IEntity {
// 	ConcoctionName: string;
// 	IngredientName: string;
// 	PrimaryAlternateIngredientName?: string;
// 	SecondaryAlternateIngredientName?: string;
// }

@Entity('ConcoctionIngredients')
export class ConcoctionIngredient{
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => Concoction, concoction => concoction.requiredIngredients)
	concoction: Concoction;

	@ManyToMany(type => Ingredient)
	ingredients: Ingredient[]
}
// export class ConcoctionIngredient extends Entity {
// 	concoctionName: string;
// 	ingredients: Ingredient[];

// 	constructor(
// 		id: number,
// 		concoctionName: string,
// 		ingredients: Ingredient[]) {
// 		super(id);
// 		this.concoctionName = concoctionName;
// 		this.ingredients = ingredients;
// 	}
// }

