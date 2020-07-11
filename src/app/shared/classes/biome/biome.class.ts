import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IBiome extends INamedEntity {
}

export class Biome extends NamedEntity {
	static tableName: string = "Biomes";

	constructor(id: number, name: string) {
		super(id, name);
	}
}