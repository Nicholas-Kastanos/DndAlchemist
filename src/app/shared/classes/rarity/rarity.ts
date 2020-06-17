import { IEntity, Entity } from '../entity/entity';

export interface IRarity extends IEntity {
    Name: string;
}
  

export class Rarity extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }

    toInterface(): IRarity{
        let rar: IRarity;
        rar.Id = this.id;
        rar.Name = this.name;
        return rar;
    }
}