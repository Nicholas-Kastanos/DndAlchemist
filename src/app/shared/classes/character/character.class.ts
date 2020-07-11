import { CustomDate } from 'src/app/calendar/classes/custom-date.class';
import { INamedEntity, NamedEntity } from '../entity/named-entity.class';

export interface ICharacter extends INamedEntity {
    Year: number;
    Month: number;
    Day: number;
}
  

export class Character extends NamedEntity {
    static tableName: string = "Characters";
    date: CustomDate;

    constructor(id: number, name: string, year: number, month: number, day: number){
        super(id, name);
        this.date = new CustomDate(year, month, day);
    }
}