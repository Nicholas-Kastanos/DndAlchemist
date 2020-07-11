import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface IRarity extends INamedEntity {
}
  

export class Rarity extends NamedEntity {

    constructor(id: number, name: string){
        super(id, name);
    }
}