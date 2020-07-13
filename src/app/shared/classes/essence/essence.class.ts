import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IEssence extends INamedEntity {
}

export class Essence extends NamedEntity {
	static tableName: string = "Essences";

	constructor(name: string) {
		super(name);
	}
}

export enum Essences {
	Air = "Air",
	Earth = "Earth",
	Ether = "Ether",
	Fire = "Fire",
	Water = "Water"
}