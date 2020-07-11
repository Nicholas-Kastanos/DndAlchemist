import { IEntity, Entity } from '../entity/entity.class';

export interface IEssence extends IEntity {
    Name: string;
}
  

export class Essence extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}