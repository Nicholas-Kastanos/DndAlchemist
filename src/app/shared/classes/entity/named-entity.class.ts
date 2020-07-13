import { IEntity, Entity } from '../entity/entity.class';

export interface INamedEntity {
	Name: string;
}


export abstract class NamedEntity {
	static tableName: string;
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}

export class Lookup extends NamedEntity {
	static tableName: string = ""
	constructor({  Name }: INamedEntity) {
		super(Name);
	}
}