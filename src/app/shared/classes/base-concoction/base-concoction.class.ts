import { Essence } from '../essence/essence.class';
import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
import { IEntity } from '../entity/entity.class';

export interface IBaseConcoction extends INamedEntity {
    BaseEffect: string;
}

export class BaseConcoction extends NamedEntity {
    baseEffect: string;
    baseEssences: Essence[] = [];

    constructor(id: number, name: string, baseEffect: string, baseEssences: Essence[]) {
        super(id, name);
        this.baseEffect = baseEffect;
        this.baseEssences = baseEssences;
    }
}

export interface IBaseConcoctionEssence extends IEntity {
    BaseConcoctionId: number;
    EssenceId: number;
}