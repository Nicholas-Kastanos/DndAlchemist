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

    toInterface(): IBiome{
        let ess: IBiome;
        ess.Id = this.id;
        ess.Name = this.name;
        return ess;
    }
}