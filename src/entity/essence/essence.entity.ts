import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Essences')
export class Essence {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	static fromEnum(e: Essences): Essence {
		let essence = new Essence();
		essence.name = e;
		return essence;
	}
}

export enum Essences {
	Air = "Air",
	Earth = "Earth",
	Ether = "Ether",
	Fire = "Fire",
	Water = "Water"
}