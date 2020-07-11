import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IDamageType extends INamedEntity {
}


export class DamageType extends NamedEntity {
	static tableName: string = "DamageTypes";

	constructor(id: number, name: string) {
		super(id, name);
	}
}