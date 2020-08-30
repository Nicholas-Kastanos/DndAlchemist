import { CustomDate } from 'src/app/calendar/classes/custom-date.class';
import { Entity, PrimaryColumn, Column } from 'typeorm';

// export interface ICharacter extends INamedEntity {
// 	Year: number;
// 	Month: number;
// 	Day: number;
// }



// export class Character extends NamedEntity {
// 	static tableName: string = "Characters";
// 	date: CustomDate;

// 	constructor(name: string, year: number, month: number, day: number) {
// 		super(name);
// 		this.date = new CustomDate(year, month, day);
// 	}
// }

@Entity('Characters')
export class Character {
	@PrimaryColumn()
	name: string;

	@Column()
	year: number

	@Column()
	month: number;

	@Column()
	day: number;
}