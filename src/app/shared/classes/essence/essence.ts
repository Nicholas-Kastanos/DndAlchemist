import { IEntity, Entity } from '../entity/entity';

export interface IEssence extends IEntity {
    Name: string;
}
  

export class Essence extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }

    toInterface(): IEssence{
        let ess: IEssence;
        ess.Id = this.id;
        ess.Name = this.name;
        return ess;
    }
}