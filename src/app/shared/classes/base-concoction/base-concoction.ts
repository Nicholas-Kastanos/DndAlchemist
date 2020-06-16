import { IEntity, Entity } from '../entity/entity';
import { Essence } from '../essence/essence';

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

    toInterface(): IBaseConcoction {
        let ess: IBaseConcoction;
        ess.Id = this.id;
        ess.Name = this.name;
        ess.BaseEffect = this.baseEffect;
        return ess;
    }
    toBaseConcoctionEssenceInterfances(): IBaseConcoctionEssence[]{
        let arr: IBaseConcoctionEssence[]
        arr = [];
        this.baseEssences.forEach(baseEssence => {
        let ess: IBaseConcoctionEssence;
        ess.Id = undefined;
        ess.BaseConcoctionId = this.id;   
        ess.EssenceId = baseEssence.id;
        arr.push(ess);
        });
        return arr;
    }
}


export interface IBaseConcoctionEssence extends IEntity {
    BaseConcoctionId: number;
    EssenceId: number;
}