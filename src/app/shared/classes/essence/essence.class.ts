import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IEssence extends INamedEntity {
}

export class Essence extends NamedEntity {
	static tableName: string = "Essences";

	constructor(id: number, name: string) {
		super(id, name);
	}
}