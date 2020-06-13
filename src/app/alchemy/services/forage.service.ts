import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ForageService {

    constructor(){}

    private getRolledNumber(numDice: number, dieSize: number, modifier = 0){
        var total = 0;

        for(var x = 0; x < dieSize; x++){
            total += (Math.floor(Math.random() * dieSize) + 1);
        }
        
        total += modifier;

        return total > 0 ? total: 0;
    }

    public forage(check: number, biomes: string[]){
        var common = 0;
        var uncommon = 0;
        var rare = 0;
        var veryRare = 0;

        if(check <= 5){
            common = this.getRolledNumber(1,4,-2);
        }else if(check > 5 && check <=10){
            common = this.getRolledNumber(1,4,1);
            uncommon = this.getRolledNumber(1,4,-2);
        }else if(check > 10 && check <= 15){
            common = this.getRolledNumber(1,6,2);
            uncommon = this.getRolledNumber(1,4);
            rare = this.getRolledNumber(1,4,-2);
        }else if(check < 15 && check >= 20){
            common = this.getRolledNumber(1,6,4);
            uncommon = this.getRolledNumber(1,6);
            rare = this.getRolledNumber(1,4);
            veryRare = this.getRolledNumber(1,4,-2);
        }else{
            common = this.getRolledNumber(1,6,4);
            uncommon = this.getRolledNumber(1,6);
            rare = this.getRolledNumber(1,4);
            veryRare = this.getRolledNumber(1,4);
        }

    }

}