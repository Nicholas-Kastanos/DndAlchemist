import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from '../../shared/classes/ingredient/ingredient.class';
import { BaseConcoction } from '../../shared/classes/base-concoction/base-concoction.class';
import { Concoction, ConcoctionIngredient } from '../../shared/classes/concoction/concoction.class';
import { DatabaseService } from '../../shared/services/database.service';
import { BrewService } from '../services/brew.service';
import { Essence, Essences } from 'src/app/shared/classes/essence/essence.class';

@Component({
    selector: 'app-brew',
    templateUrl: './brew.page.html',
    styleUrls: ['./brew.page.scss'],
})

export class BrewComponent implements OnInit {

    ingredients: {ingredient:Ingredient, checked: boolean}[] = [];

    requiredEssences: {essence: Essence, fulfilled: boolean}[] = [];
    newConcoction: Concoction;
    newBaseConcoction: BaseConcoction;
    requiredIngredients: {display: string, requiredIngredient: ConcoctionIngredient, fulfilled: number}[] = [];

    complete: boolean = false;

    constructor(
        public modalCtrl: ModalController,
        private database: DatabaseService,
        private brewService: BrewService
    ) { }

    @Input() concoction: Concoction;
    @Input() baseConcoction: BaseConcoction;

    ngOnInit() {
        this.database.getIngredients()
            .then((result) => {
                result.forEach(ingredient => {
                    this.ingredients.push({ingredient: ingredient, checked: false});
                });
            })

        this.brewService.initialise(this.baseConcoction, this.concoction);
        
        this.updateData();

    }

    updateData(){
        this.requiredEssences = this.brewService.requiredEssences;
        this.newConcoction = this.brewService.brewedConcoction;
        this.newBaseConcoction = this.brewService.brewedBaseConcoction;
        this.requiredIngredients = this.brewService.requiredIngredients;
        this.complete = this.brewService.complete;
    }   

    select(item: any) {
        this.brewService.selectItem(item.ingredient, item.checked);
        this.updateData();
    }

    dismiss() {
        this.brewService.reset();
        this.ingredients.forEach(ingredient => {
            ingredient.checked = false;
        })
        this.modalCtrl.dismiss();
    }

    addToInventory(){
        console.debug("add to inventory")
    }

    getElement(elementName: string){
        switch(elementName){
            case Essences.Air: {
                return "../../assets/img/air.png";
            }
            case Essences.Earth: {
                return "../../assets/img/earth.png";
            }
            case Essences.Ether: {
                return "../../assets/img/ether.png";
            }
            case Essences.Fire: {
                return "../../assets/img/fire.png";
            }
            case Essences.Water: {
                return "../../assets/img/water.png";
            }
            default: {
                return "../../assets/img/new_moon.svg";
            }
        }
    }


}