// import { IEntity } from '../entity/entity.class';
// import { INamedEntity, NamedEntity } from '../entity/named-entity.class';
// import { Essence } from '../essence/essence.class';

import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Essence } from '../essence/essence.entity';

@Entity('BaseConcoctions')
export class BaseConcoction {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	@Column()
	baseEffect: string;

	@Column({ type: "int", nullable: true })
	bombRadius?: number;

	@Column({ type: "int", nullable: true })
	dustRadius?: number;

	@Column({ type: "int", nullable: true })
	oilUses?: number;

	@OneToMany(type => BaseConcoctionEssences, baseConcoctionEssences => baseConcoctionEssences.baseConcoction)
	essences: BaseConcoctionEssences[];
}

@Entity('BaseConcoctionEssences')
export class BaseConcoctionEssences {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(type => BaseConcoction, baseConcoction => baseConcoction.essences)
	baseConcoction: BaseConcoction;

	@ManyToOne(type => Essence)
	essence: Essence;
}

// export interface IBaseConcoction extends INamedEntity {
// 	BaseEffect: string;
// 	BombRadius?: number;
// 	DustArea?: number;
// 	OilUses?: number;
// }

// export class BaseConcoction extends NamedEntity {
// 	static tableName: string = "BaseConcoctions";
// 	static essenceTableName: string = "BaseConcoctionEssences";
// 	baseEffect: string;
// 	baseEssences: Essence[] = [];

// 	bombRadius?: number;
// 	dustArea?: number;
// 	oilUses?: number;

// 	constructor(name: string, baseEffect: string, baseEssences: Essence[], bombRadius?: number,	dustArea?: number, oilUses?: number) {
// 		super(name);
// 		this.baseEffect = baseEffect;
// 		this.baseEssences = baseEssences;
// 		this.bombRadius = bombRadius;
// 		this.dustArea = dustArea;
// 		this.oilUses = oilUses;
// 	}
// }

// export interface IBaseConcoctionEssence extends IEntity {
// 	BaseConcoctionName: string;
// 	EssenceName: string;
// }

// // export class Potion extends BaseConcoction {
// // 	constructor(name: string, baseEffect: string, baseEssences: Essence[]) {
// // 		super(name, baseEffect, baseEssences);		
// // 	}
// // }
// // export class Bomb extends BaseConcoction {
// // 	radius: number;

// // 	constructor(name: string, baseEffect: string, baseEssences: Essence[], radius: number) {
// // 		super(name, baseEffect, baseEssences);		
// // 		this.radius = radius;
// // 	}
// // }

// // export class Dust extends BaseConcoction {
// // 	area: number;

// // 	constructor(name: string, baseEffect: string, baseEssences: Essence[], area: number) {
// // 		super(name, baseEffect, baseEssences);		
// // 		this.area = area;
// // 	}
// // }

// // export class Oil extends BaseConcoction {
// // 	uses: number;

// // 	constructor(name: string, baseEffect: string, baseEssences: Essence[], uses: number) {
// // 		super(name, baseEffect, baseEssences);		
// // 		this.uses = uses;
// // 	}
// // }