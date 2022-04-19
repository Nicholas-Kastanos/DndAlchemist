import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface ISaveType extends INamedEntity {
}


export class SaveType extends NamedEntity {
	static tableName: string = "SaveTypes";

	constructor(name: string) {
		super(name);
	}
}