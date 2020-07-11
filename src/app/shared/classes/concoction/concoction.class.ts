import { DamageType } from '../damage-type/damage-type.class';
import { Entity, IEntity } from '../entity/entity.class';
import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
import { Essence } from '../essence/essence.class';
import { Ingredient } from '../ingredient/ingredient.class';
import { SaveType } from '../save-type/save-type.class';

export interface IConcoction extends INamedEntity {
	DieType?: number;
	DieNumber?: number;
	DC?: number;
	SaveTypeId?: number;
	DamageTypeId?: number;
	Effect: string;
	DurationLength?: number;
	DurationType?: string;
}

export interface IConcoctionImport {
	name: string;
	dieType: number | undefined;
	dieNumber: number | undefined;
	DC: number | undefined;
	save: string | undefined;
	damageType: string | undefined;
	essences: string[];
	requiredIngredients: string[];
	effect: string;
	durationLength: number | undefined;
	durationType: number | undefined;
}

export class Concoction extends NamedEntity {
	static tableName: string = "Concoctions";
	dieType?: number;
	dieNumber?: number;
	DC?: number;
	saveType?: SaveType;
	damageType?: DamageType;
	essences: Essence[];
	requiredIngredients: ConcoctionIngredient[];
	effect: string;
	durationLength?: number;
	durationType?: string;

	constructor(
		id: number,
		name: string,
		effect: string,
		essences: Essence[],
		requiredIngredients: ConcoctionIngredient[],
		dieType?: number,
		dieNumber?: number,
		DC?: number,
		saveType?: SaveType,
		damageType?: DamageType,
		durationLength?: number,
		durationType?: string,
	) {
		super(id, name);
		this.effect = effect;
		this.essences = essences;
		this.requiredIngredients = requiredIngredients;
		this.dieType = dieType;
		this.dieNumber = dieNumber;
		this.DC = DC;
		this.saveType = saveType;
		this.damageType = damageType;
		this.durationLength = durationLength;
		this.durationType = durationType;
	}
}

export interface IConcoctionEssence extends IEntity {
	ConcoctionId: number;
	EssenceId: number;
}

export interface IConcoctionIngredient extends IEntity {
	ConcoctionId: number;
	IngredientId: number;
	PrimaryAlternateIngredientId?: number | undefined;
	SecondaryAlternateIngredientId?: number | undefined;
}
export class ConcoctionIngredient extends Entity {
	concoctionId: number;
	ingredients: Ingredient[];

	constructor(
		id: number,
		concoctionId: number,
		ingredients: Ingredient[]) {
		super(id);
		this.concoctionId = concoctionId;
		this.ingredients = ingredients;
	}
}

