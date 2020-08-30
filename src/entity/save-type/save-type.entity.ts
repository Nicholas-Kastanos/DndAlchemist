import { Entity, PrimaryColumn } from 'typeorm';

@Entity('SaveTypes')
export class SaveType {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;

	static fromEnum(e: SaveTypes): SaveType {
		let s = new SaveType();
		s.name = e;
		return s;
	}
}

export enum SaveTypes {
	Strength = "Strength",
	Dexterity = "Dexterity",
	Constitution = "Constitution",
	Intelligence = "Intelligence",
	Wisdom = "Wisdom",
	Charisma = "Charisma"
}