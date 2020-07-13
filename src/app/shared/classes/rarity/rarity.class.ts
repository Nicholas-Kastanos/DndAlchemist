import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IRarity extends INamedEntity {
}


export class Rarity extends NamedEntity {
	static tableName: string = "Rarities";

	constructor(name: string) {
		super(name);
	}
}

export enum Rarities {
	Common = "Common",
	Uncommon = "Uncommon",
	Rare = "Rare",
	VeryRare = "Very Rare",
	Legendary = "Legendary",
	Artifact = "Artifact"
}