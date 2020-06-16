import { IEntity, Entity } from '../entity/entity';

export interface IEssance extends IEntity {
    Name: string;
}
  

export class Essance extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }

    toInterface(): IEssance{
        let ess: IEssance;
        ess.Id = this.id;
        ess.Name = this.name;
        return ess;
    }
}