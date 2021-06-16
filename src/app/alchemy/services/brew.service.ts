import { Injectable } from '@angular/core';
import { Essence, Essences } from 'src/app/shared/classes/essence/essence.class';
import { Concoction, ConcoctionIngredient } from 'src/app/shared/classes/concoction/concoction.class';
import { Ingredient } from 'src/app/shared/classes/ingredient/ingredient.class';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction.class';

@Injectable({
    providedIn: 'root'
})

export class BrewService {

    public requiredEssences: { essence: Essence, fulfilled: boolean }[] = []
    public brewedConcoction: Concoction;
    public brewedBaseConcoction: BaseConcoction;
    public requiredIngredients: { display: string, requiredIngredient: ConcoctionIngredient, fulfilled: number }[] = [];

    public complete: boolean = false;

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
        this.brewedBaseConcoction = base;
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

    private checkComplete(){
        this.complete = this.requiredEssences.every(essence => essence.fulfilled == true)
            && this.requiredIngredients.every(ingredient => ingredient.fulfilled == ingredient.requiredIngredient.ingredients.length);
    }


    // call whenever an ingredient is selected/deselected
    public selectItem(item: Ingredient, checked: boolean) {
        item.essences.forEach(essence => {
            var x = checked ? 1 : -1;
            switch (essence.name) {
                case Essences.Air: {
                    this.selectedCollection.air = this.selectedCollection.air + x;
                    break;
                }
                case Essences.Earth: {
                    this.selectedCollection.earth = this.selectedCollection.earth + x;
                    break;
                }
                case Essences.Ether: {
                    this.selectedCollection.ether = this.selectedCollection.ether + x;
                    break;
                }
                case Essences.Fire: {
                    this.selectedCollection.fire = this.selectedCollection.fire + x;
                    break;
                }
                case Essences.Water: {
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
        this.checkComplete();
    }

    private checkIngredient(item: Ingredient, checked: boolean) {

        if (this.brewedConcoction.DC != undefined) {
            if (item.increaseSave) {
                this.brewedConcoction.DC = checked ? (this.brewedConcoction.DC + 1) : (this.brewedConcoction.DC - 1);
            }
        }

        if (this.brewedConcoction.dieNumber != undefined && this.brewedConcoction.damageType.name != "Healing" && this.brewedConcoction.damageType.name != "Arcane Recovery") {
            if (item.increaseDamageNumber) {
                this.brewedConcoction.dieNumber = checked ? (this.brewedConcoction.dieNumber + 1) : (this.brewedConcoction.dieNumber - 1);
            }
        }

        if (this.brewedConcoction.damageType != undefined) {
            if (item.damageType != undefined && this.brewedConcoction.damageType.name != "Healing" && this.brewedConcoction.damageType.name != "ArcaneRecovery") {
                this.brewedConcoction.damageType = item.damageType;
            }
            if(this.brewedConcoction.damageType.name == "Healing"){
                if(item.increaseHealing){
                    this.brewedConcoction.dieNumber = checked ? (this.brewedConcoction.dieNumber + 1) : (this.brewedConcoction.dieNumber - 1);
                }
            }
    
            if(this.brewedConcoction.damageType.name == "Arcane Recovery"){
                if(item.increaseArcaneRecovery){
                    this.brewedConcoction.dieNumber = checked ? (this.brewedConcoction.dieNumber + 1) : (this.brewedConcoction.dieNumber - 1);
                }
            }
        }

        if(this.brewedBaseConcoction.bombRadius != undefined){
            if(item.doubleBombRadius){
                this.brewedBaseConcoction.bombRadius = checked ?
                    this.brewedBaseConcoction.bombRadius*2 :
                    this.brewedBaseConcoction.bombRadius/2;
            }
        }

        if(this.brewedBaseConcoction.dustArea != undefined){
            if(item.doubleDustArea){
                this.brewedBaseConcoction.dustArea = checked ?
                    this.brewedBaseConcoction.dustArea*2 :
                    this.brewedBaseConcoction.dustArea/2;
            }
        }

        if(this.brewedBaseConcoction.oilUses != undefined){
            if(item.extraOilUse){
                this.brewedBaseConcoction.oilUses = checked ?
                    this.brewedBaseConcoction.oilUses + 1 :
                    this.brewedBaseConcoction.oilUses - 1;
            }
        }

        if (this.brewedConcoction.dieType != undefined && this.brewedConcoction.damageType.name != "Healing" && this.brewedConcoction.damageType.name != "Arcane Recovery") {
            if (item.increaseDamageSize) {
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
            if (item.doubleDuration) {
                this.brewedConcoction.durationLength = checked ? this.brewedConcoction.durationLength * 2 : this.brewedConcoction.durationLength/2;
            }
        }

        if (this.requiredIngredients.length > 0) {
            this.requiredIngredients.forEach(required => {
                if (required.requiredIngredient.ingredients.some(x => x.name == item.name)) {
                    required.fulfilled = checked ? required.fulfilled + 1 : required.fulfilled - 1;
                }
            })
        }

    }

    private checkRequired() {
        var elements: {[id: string] : number} = {};
        elements[Essences.Air] = this.selectedCollection.air > this.requiredCollection.air ? this.requiredCollection.air : this.selectedCollection.air;
        elements[Essences.Earth] = this.selectedCollection.earth > this.requiredCollection.earth ? this.requiredCollection.earth : this.selectedCollection.earth;
        elements[Essences.Ether] = this.selectedCollection.ether > this.requiredCollection.ether ? this.requiredCollection.ether : this.selectedCollection.ether;
        elements[Essences.Fire] = this.selectedCollection.fire > this.requiredCollection.fire ? this.requiredCollection.fire : this.selectedCollection.fire;
        elements[Essences.Water] = this.selectedCollection.water > this.requiredCollection.water ? this.requiredCollection.water : this.selectedCollection.water;
        this.requiredEssences.forEach(essence => {
            if (elements[essence.essence.name] > 0) {
                essence.fulfilled = true;
                elements[essence.essence.name]--
            } else {
                essence.fulfilled = false;
            }
        })
    }

    private getRequired(essences: Essence[]) {
        essences.forEach(essence => {
            var x = 1;
            switch (essence.name) {
                case Essences.Air: {
                    this.requiredCollection.air++;
                    break;
                }
                case Essences.Earth: {
                    this.requiredCollection.earth++;
                    break;
                }
                case Essences.Ether: {
                    this.requiredCollection.ether++;
                    break;
                }
                case Essences.Fire: {
                    this.requiredCollection.fire++;
                    break;
                }
                case Essences.Water: {
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