import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Essences')
export class Essence {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;
}

export enum Essences {
	Air = "Air",
	Earth = "Earth",
	Ether = "Ether",
	Fire = "Fire",
	Water = "Water"
}