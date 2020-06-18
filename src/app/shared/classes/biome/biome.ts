import { IEntity, Entity } from '../entity/entity';

export interface IBiome extends IEntity {
    Name: string;
}
  

export class Biome extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}