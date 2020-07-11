import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IBiome extends INamedEntity {
}
  
export class Biome extends NamedEntity {

    constructor(id: number, name: string){
        super(id, name);
    }
}