import {Injectable} from '@angular/core';
import { Essence } from 'src/app/shared/classes/essence/essence';
import { Concoction } from 'src/app/shared/classes/concoction/concoction';
import { Ingredient } from 'src/app/shared/classes/ingredient/ingredient';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction';

@Injectable({
    providedIn: 'root'
})

export class BrewService {

    public requiredEssences: {essence: Essence, fulfilled: boolean}[] = []
    public brewedConcoction: Concoction;

    public requiredCollection = {
        "ether": 0,
        "earth": 0,
        "fire": 0,
        "air": 0,
        "water": 0
    }

    public selectedCollection = {
        "ether": 0,
        "earth": 0,
        "fire": 0,
        "air": 0,
        "water": 0
    };

    constructor () {}

    public initialise(base: BaseConcoction, concoction: Concoction){
        this.getRequired(base.baseEssences);
        this.getRequired(concoction.essences);
        base.baseEssences.forEach( essence => {
            this.requiredEssences.push({essence: essence, fulfilled: false});
        })
        concoction.essences.forEach(essence => {
            this.requiredEssences.push({essence: essence, fulfilled: false});
        })
    }


    // call whenever an ingredient is selected/deselected
    public selectItem(item: Ingredient, checked: boolean){
        item.essences.forEach(essence => {
            var x = checked ? 1 : -1;
            switch(essence.id){
                case 1: {
                    this.selectedCollection.air = this.selectedCollection.air + x;
                    break;
                }
                case 2: {
                    this.selectedCollection.earth = this.selectedCollection.earth + x;
                    break;
                }
                case 3: {
                    this.selectedCollection.ether = this.selectedCollection.ether + x;
                    break;
                }
                case 4: {
                    this.selectedCollection.fire = this.selectedCollection.fire + x;
                    break;
                }
                case 5: {
                    this.selectedCollection.water = this.selectedCollection.water + x;
                    break;
                }
                default: {
                    break;
                }
            }
        })
        this.checkRequired();
    }

    private checkRequired(){
        var elements = [];
        elements[0] = this.selectedCollection.air > this.requiredCollection.air ? this.requiredCollection.air : this.selectedCollection.air;
        elements[1] = this.selectedCollection.earth > this.requiredCollection.earth ? this.requiredCollection.earth : this.selectedCollection.earth;
        elements[2] = this.selectedCollection.ether > this.requiredCollection.ether ? this.requiredCollection.ether : this.selectedCollection.ether;
        elements[3] = this.selectedCollection.fire > this.requiredCollection.fire ? this.requiredCollection.fire : this.selectedCollection.fire;
        elements[4] = this.selectedCollection.water > this.requiredCollection.water ? this.requiredCollection.water : this.selectedCollection.water;
        console.debug(elements)
        this.requiredEssences.forEach(essence => {
            console.debug(essence.essence.id)
            if(elements[essence.essence.id-1] > 0){
                essence.fulfilled = true;
                elements[essence.essence.id-1]--
            }else {
                essence.fulfilled = false;
            }
            console.debug(JSON.stringify(essence))
        })
    }

    private getRequired(essences: Essence[]){
        essences.forEach(essence => {
            var x = 1;
            switch(essence.id){
                case 1: {
                    this.requiredCollection.air++;
                    break;
                }
                case 2: {
                    this.requiredCollection.earth++;
                    break;
                }
                case 3: {
                    this.requiredCollection.ether++;
                    break;
                }
                case 4: {
                    this.requiredCollection.fire++;
                    break;
                }
                case 5: {
                    this.requiredCollection.water++;
                    break;
                }
                default: {
                    break;
                }
            }
        })
    }

}