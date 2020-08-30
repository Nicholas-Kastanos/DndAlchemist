import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Rarities')
export class Rarity {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	static fromEnum(e: Rarities): Rarity {
		let r = new Rarity();
		r.name = e;
		return r;
	}
}

export enum Rarities {
	Common = "Common",
	Uncommon = "Uncommon",
	Rare = "Rare",
	VeryRare = "Very Rare",
	Legendary = "Legendary",
	Artifact = "Artifact"
}