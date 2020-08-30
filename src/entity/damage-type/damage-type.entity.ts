import { Entity, PrimaryColumn } from 'typeorm';

@Entity('DamageTypes')
export class DamageType {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	static fromEnum(e: DamageTypes): DamageType {
		let d = new DamageType();
		d.name = e;
		return d;
	}
}

export enum DamageTypes {
	Acid = "Acid",
	Bludgeoning = "Bludgeoning",
	Cold = "Cold",
	Fire = "Fire",
	Force = "Force",
	Lightning = "Lightning",
	Necrotic = "Necrotic",
	Piercing = "Piercing",
	Poison = "Poison",
	Psychic = "Psychic",
	Radiant = "Radiant",
	Slashing = "Slashing",
	Thunder = "Thunder",
	Healing = "Healing",
	ArcaneRecovery = "Arcane Recovery"
}