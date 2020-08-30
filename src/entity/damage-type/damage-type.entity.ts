import { Entity, PrimaryColumn } from 'typeorm';

@Entity('DamageTypes')
export class DamageType {
	@PrimaryColumn({ type: "nvarchar2", length: "100" })
	name: string;
}