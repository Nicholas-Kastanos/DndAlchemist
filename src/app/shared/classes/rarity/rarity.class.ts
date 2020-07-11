import { IEntity, Entity } from '../entity/entity.class';

export interface IRarity extends IEntity {
    Name: string;
}
  

export class Rarity extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}