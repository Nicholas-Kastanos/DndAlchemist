import { IEntity, Entity } from '../entity/entity';
import { Essance } from '../essance/essance';

export interface IBaseConcoction extends IEntity {
    Name: string;
    BaseEffect: string;
}

export class BaseConcoction extends Entity {
    name: string;
    baseEffect: string;
    baseEssances: Essance[] = [];

    constructor(id: number, name: string, baseEffect: string, baseEssances: Essance[]) {
        super(id);
        this.name = name;
        this.baseEffect = baseEffect;
        this.baseEssances = baseEssances;
    }

    toInterface(): IBaseConcoction {
        let ess: IBaseConcoction;
        ess.Id = this.id;
        ess.Name = this.name;
        ess.BaseEffect = this.baseEffect;
        return ess;
    }
    toBaseConcoctionEssanceInterfances(): IBaseConcoctionEssance[]{
        let arr: IBaseConcoctionEssance[]
        arr = [];
        this.baseEssances.forEach(baseEssance => {
        let ess: IBaseConcoctionEssance;
        ess.Id = undefined;
        ess.BaseConcoctionId = this.id;   
        ess.EssanceId = baseEssance.id;
        arr.push(ess);
        });
        return arr;
    }
}


export interface IBaseConcoctionEssance extends IEntity {
    BaseConcoctionId: number;
    EssanceId: number;
}