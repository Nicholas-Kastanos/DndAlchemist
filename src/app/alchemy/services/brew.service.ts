import { Injectable } from '@angular/core';
import { Essence } from 'src/app/shared/classes/essence/essence.class';
import { Concoction, ConcoctionIngredient } from 'src/app/shared/classes/concoction/concoction.class';
import { Ingredient } from 'src/app/shared/classes/ingredient/ingredient.class';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction.class';

@Injectable({
    providedIn: 'root'
})

export class BrewService {

    public requiredEssences: { essence: Essence, fulfilled: boolean }[] = []
    public brewedConcoction: Concoction;
    public requiredIngredients: { display: string, requiredIngredient: ConcoctionIngredient, fulfilled: number }[] = [];

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

    constructor() { }

    public initialise(base: BaseConcoction, concoction: Concoction) {
        this.brewedConcoction = concoction;
        this.getRequired(base.baseEssences);
        this.getRequired(concoction.essences);
        base.baseEssences.forEach(essence => {
            this.requiredEssences.push({ essence: essence, fulfilled: false });
        })
        concoction.essences.forEach(essence => {
            this.requiredEssences.push({ essence: essence, fulfilled: false });
        })

        concoction.requiredIngredients.forEach(required => {
            var requiredString = "";
            for (var x = 0; x < required.ingredients.length - 1; x++) {
                requiredString = requiredString + required.ingredients[x].name + " or ";
            }
            requiredString = requiredString + required.ingredients[required.ingredients.length - 1].name;
            this.requiredIngredients.push({ display: requiredString, requiredIngredient: required, fulfilled: 0 });
        })
    }

    public reset() {
        this.requiredEssences = [];
        this.requiredIngredients = [];
        this.requiredCollection = {
            "ether": 0,
            "earth": 0,
            "fire": 0,
            "air": 0,
            "water": 0
        }
        this.selectedCollection = {
            "ether": 0,
            "earth": 0,
            "fire": 0,
            "air": 0,
            "water": 0
        }
    }


    // call whenever an ingredient is selected/deselected
    public selectItem(item: Ingredient, checked: boolean) {
        item.essences.forEach(essence => {
            var x = checked ? 1 : -1;
            switch (essence.id) {
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
        this.checkIngredient(item, checked);
    }

    private checkIngredient(item: Ingredient, checked: boolean) {
        if (this.brewedConcoction.DC != undefined) {
            if (item.increaseSave == true) {
                this.brewedConcoction.DC = checked ? (this.brewedConcoction.DC + 1) : (this.brewedConcoction.DC - 1);
            }
        }

        if (this.brewedConcoction.dieNumber != undefined) {
            if (item.increaseDamageNumber == true) {
                this.brewedConcoction.dieNumber = checked ? (this.brewedConcoction.dieNumber + 1) : (this.brewedConcoction.dieNumber - 1);
            }
        }

        if (this.brewedConcoction.damageType != undefined) {
            // TODO check if healing or arcane recov
            if (item.damageType != undefined) {
                this.brewedConcoction.damageType = item.damageType;
            }
        }

        if (this.brewedConcoction.dieType != undefined) {
            if (item.increaseDamageSize == true) {
                switch (this.brewedConcoction.dieType) {
                    case 4:
                        this.brewedConcoction.dieType = checked ? 6 : 4;
                        break;
                    case 6:
                        this.brewedConcoction.dieType = checked ? 8 : 4;
                        break;
                    case 8:
                        this.brewedConcoction.dieType = checked ? 10 : 6;
                        break;
                    case 10:
                        this.brewedConcoction.dieType = checked ? 12 : 8;
                        break;
                    case 12:
                        this.brewedConcoction.dieType = checked ? 20 : 10;
                        break;
                    case 20:
                        this.brewedConcoction.dieType = checked ? 20 : 12;
                        break;
                    default:
                        break;
                }
            }
        }

        if (this.brewedConcoction.durationLength != undefined) {
            console.debug(JSON.stringify(item))
            console.debug(item.doubleDuration == true);
            if (item.doubleDuration == true) {
                console.debug("inside if")
                this.brewedConcoction.durationLength = checked ? this.brewedConcoction.durationLength * 2 : this.brewedConcoction.durationLength/2;
            }
        }

        if (this.requiredIngredients.length > 0) {
            this.requiredIngredients.forEach(required => {
                if (required.requiredIngredient.ingredients.some(x => x.id == item.id)) {
                    required.fulfilled = checked ? required.fulfilled + 1 : required.fulfilled - 1;
                }
            })
        }

    }

    private checkRequired() {
        var elements = [];
        elements[0] = this.selectedCollection.air > this.requiredCollection.air ? this.requiredCollection.air : this.selectedCollection.air;
        elements[1] = this.selectedCollection.earth > this.requiredCollection.earth ? this.requiredCollection.earth : this.selectedCollection.earth;
        elements[2] = this.selectedCollection.ether > this.requiredCollection.ether ? this.requiredCollection.ether : this.selectedCollection.ether;
        elements[3] = this.selectedCollection.fire > this.requiredCollection.fire ? this.requiredCollection.fire : this.selectedCollection.fire;
        elements[4] = this.selectedCollection.water > this.requiredCollection.water ? this.requiredCollection.water : this.selectedCollection.water;
        this.requiredEssences.forEach(essence => {
            if (elements[essence.essence.id - 1] > 0) {
                essence.fulfilled = true;
                elements[essence.essence.id - 1]--
            } else {
                essence.fulfilled = false;
            }
        })
    }

    private getRequired(essences: Essence[]) {
        essences.forEach(essence => {
            var x = 1;
            switch (essence.id) {
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