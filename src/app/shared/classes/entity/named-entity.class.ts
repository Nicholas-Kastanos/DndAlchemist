import { IEntity, Entity } from '../entity/entity.class';

export interface INamedEntity extends IEntity {
	Name: string;
}


export abstract class NamedEntity extends Entity {
	static tableName: string;
	name: string;

	constructor(id: number, name: string) {
		super(id);
		this.name = name;
	}
}

export class Lookup extends NamedEntity {
	static tableName: string = ""
	constructor({ Id, Name }: INamedEntity) {
		super(Id, Name);
	}
}