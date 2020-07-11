import { IEntity, Entity } from '../entity/entity.class';
import { Essence } from '../essence/essence.class';

export interface IBaseConcoction extends IEntity {
    Name: string;
    BaseEffect: string;
}

export class BaseConcoction extends Entity {
    name: string;
    baseEffect: string;
    baseEssences: Essence[] = [];

    constructor(id: number, name: string, baseEffect: string, baseEssences: Essence[]) {
        super(id);
        this.name = name;
        this.baseEffect = baseEffect;
        this.baseEssences = baseEssences;
    }
}


export interface IBaseConcoctionEssence extends IEntity {
    BaseConcoctionId: number;
    EssenceId: number;
}