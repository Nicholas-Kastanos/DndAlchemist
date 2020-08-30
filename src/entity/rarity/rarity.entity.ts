import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Rarities')
export class Rarity {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;
}

export enum Rarities {
	Common = "Common",
	Uncommon = "Uncommon",
	Rare = "Rare",
	VeryRare = "Very Rare",
	Legendary = "Legendary",
	Artifact = "Artifact"
}