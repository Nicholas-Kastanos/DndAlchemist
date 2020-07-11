import {Injectable, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/shared/services/database.service';
import {Biome} from 'src/app/shared/classes/biome/biome.class';
import {Ingredient} from 'src/app/shared/classes/ingredient/ingredient.class';
import {Rarity} from 'src/app/shared/classes/rarity/rarity.class';

@Injectable({
    providedIn: 'root'
})
export class ForageService implements OnInit{

    ingredients: Ingredient[];
    rarities: Rarity[];
    biomes: Biome[]

    constructor(
        private database: DatabaseService
    ){
        this.database.initialiseSubject.subscribe(() => {
            this.database.getIngredients()
            .then((result) => {
                this.ingredients = result;
            })
            this.database.getBiomes()
            .then(result => {
                this.biomes = result;
            })
            this.database.getRarities()
            .then(result => {
                this.rarities = result;
            })
        })
     }

    ngOnInit(){
        
    }

    private getRolledNumber(numDice: number, dieSize: number, modifier = 0){
        var total = 0;

        for(var x = 0; x < numDice; x++){
            total += (Math.floor(Math.random() * dieSize) + 1);
        }
        
        total += modifier;

        return total > 0 ? total: 0;
    }

    public forage(check: number, biomes: number[]){
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
        }else if(check > 15 && check <= 20){
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

        var foragedIngredients: Ingredient[] = [];

        var biomelist = this.biomes.filter(b => biomes.includes(b.id));
        if(common > 0){
            foragedIngredients = foragedIngredients.concat(this.getIngredients(this.rarities.filter(r => r.id == 1)[0], biomelist, common))
        }

        if(uncommon > 0){
            foragedIngredients = foragedIngredients.concat(this.getIngredients(this.rarities.filter(r => r.id == 2)[0], biomelist, uncommon))
        }

        if(rare > 0){
            foragedIngredients = foragedIngredients.concat(this.getIngredients(this.rarities.filter(r => r.id == 3)[0], biomelist, rare))
        }

        if(veryRare > 0){
            foragedIngredients = foragedIngredients.concat(this.getIngredients(this.rarities.filter(r => r.id == 4)[0], biomelist, veryRare))
        }

        console.debug(JSON.stringify(foragedIngredients))
        return foragedIngredients

    }

    getIngredients(rarity: Rarity, biome: Biome[], amount: number){
        var foragedIngredients: Ingredient[] = [];
        var availableIngredients: Ingredient[] = [];
        this.ingredients.forEach(ingredient =>{
            if(ingredient.rarity != undefined && ingredient.locations.length > 0){
                if(ingredient.rarity.id == rarity.id && ingredient.locations.some(l => biome.some(b => b.id == l.id))){
                    availableIngredients.push(ingredient);
                }
            }
        })
        for(var x = 0; x < amount; x++){
            var index = (Math.floor(Math.random() * availableIngredients.length));
            foragedIngredients.push(availableIngredients[index]);
        }

        return foragedIngredients;
    }

}