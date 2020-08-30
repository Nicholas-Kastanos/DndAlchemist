import { Entity, PrimaryColumn } from 'typeorm';

@Entity('Biomes')
export class Biome {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;
}