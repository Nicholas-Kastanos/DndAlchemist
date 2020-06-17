import { IEntity, Entity } from '../entity/entity';

export interface IDamageType extends IEntity {
    Name: string;
}
  

export class DamageType extends Entity {
    name: string;

    constructor(id: number, name: string){
        super(id);
        this.name = name;
    }

    toInterface(): IDamageType{
        let dam: IDamageType;
        dam.Id = this.id;
        dam.Name = this.name;
        return dam;
    }
}