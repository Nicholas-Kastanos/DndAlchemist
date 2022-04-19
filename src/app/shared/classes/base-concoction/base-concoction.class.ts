import { IEntity } from '../entity/entity.class';
import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
import { Essence } from '../essence/essence.class';

export interface IBaseConcoction extends INamedEntity {
	BaseEffect: string;
	BombRadius?: number;
	DustArea?: number;
	OilUses?: number;
}

export class BaseConcoction extends NamedEntity {
	static tableName: string = "BaseConcoctions";
	static essenceTableName: string = "BaseConcoctionEssences";
	baseEffect: string;
	baseEssences: Essence[] = [];

	bombRadius?: number;
	dustArea?: number;
	oilUses?: number;

	constructor(name: string, baseEffect: string, baseEssences: Essence[], bombRadius?: number,	dustArea?: number, oilUses?: number) {
		super(name);
		this.baseEffect = baseEffect;
		this.baseEssences = baseEssences;
		this.bombRadius = bombRadius;
		this.dustArea = dustArea;
		this.oilUses = oilUses;
	}
}

export interface IBaseConcoctionEssence extends IEntity {
	BaseConcoctionName: string;
	EssenceName: string;
}

// export class Potion extends BaseConcoction {
// 	constructor(name: string, baseEffect: string, baseEssences: Essence[]) {
// 		super(name, baseEffect, baseEssences);		
// 	}
// }
// export class Bomb extends BaseConcoction {
// 	radius: number;

// 	constructor(name: string, baseEffect: string, baseEssences: Essence[], radius: number) {
// 		super(name, baseEffect, baseEssences);		
// 		this.radius = radius;
// 	}
// }

// export class Dust extends BaseConcoction {
// 	area: number;

// 	constructor(name: string, baseEffect: string, baseEssences: Essence[], area: number) {
// 		super(name, baseEffect, baseEssences);		
// 		this.area = area;
// 	}
// }

// export class Oil extends BaseConcoction {
// 	uses: number;

// 	constructor(name: string, baseEffect: string, baseEssences: Essence[], uses: number) {
// 		super(name, baseEffect, baseEssences);		
// 		this.uses = uses;
// 	}
// }