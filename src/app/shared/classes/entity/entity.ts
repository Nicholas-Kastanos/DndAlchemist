export abstract class Entity {
    id: number;
    
    constructor(id: number) {
        this.id = id;
    }
    abstract toInterface(): IEntity;
}

export interface IEntity {
    Id: number;
}