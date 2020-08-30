import { Entity, PrimaryColumn } from 'typeorm';

@Entity('SaveTypes')
export class SaveType {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;
}