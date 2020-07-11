import { IEntity, Entity } from '../entity/entity.class';

export interface INamedEntity extends IEntity {
    Name: string;
}
  

export class NamedEntity extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}