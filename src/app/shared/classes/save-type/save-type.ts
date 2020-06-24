import { IEntity, Entity } from '../entity/entity';

export interface ISaveType extends IEntity {
    Name: string;
}
  

export class SaveType extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }
}