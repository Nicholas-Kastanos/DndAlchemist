export abstract class Entity {
	id: number;

	constructor(id: number) {
		this.id = id;
	}
}

export interface IEntity {
	Id: number;
}