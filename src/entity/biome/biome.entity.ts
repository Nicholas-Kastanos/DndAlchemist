import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Biomes')
export class Biome {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	static fromEnum(e: Biomes): Biome {
		let b = new Biome();
		b.name = e;
		return b;
	}
}

export enum Biomes {
	Arctic = "Arctic",
	Coast = "Coast",
	Desert = "Desert",
	Forest = "Forest",
	Grassland = "Grassland",
	Hill = "Hill",
	Mountain = "Mountain",
	Swamp = "Swamp",
	Underdard = "Underdark"
}