import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from '../../shared/classes/ingredient/ingredient.class';
import { BaseConcoction } from '../../shared/classes/base-concoction/base-concoction.class';
import { Concoction, ConcoctionIngredient } from '../../shared/classes/concoction/concoction.class';
import { DatabaseService } from '../../shared/services/database.service';
import { BrewService } from '../services/brew.service';
import { Essence } from 'src/app/shared/classes/essence/essence.class';

@Component({
    selector: 'app-brew',
    templateUrl: './brew.page.html',
    styleUrls: ['./brew.page.scss'],
})

export class BrewComponent implements OnInit {

    ingredients: {ingredient:Ingredient, checked: boolean}[] = [];

    requiredEssences: {essence: Essence, fulfilled: boolean}[] = [];
    newConcoction: Concoction;
    requiredIngredients: {display: string, requiredIngredient: ConcoctionIngredient, fulfilled: number}[] = [];

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
        this.requiredIngredients = this.brewService.requiredIngredients;
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

    getElement(elementId: number) {
        // 1: air
        // 2 earth
        // 3 ether
        // 4 fire
        // 5 water
        switch (elementId) {
            case 1: {
                return "../../assets/img/air.png";
            }
            case 2: {
                return "../../assets/img/earth.png";
            }
            case 3: {
                return "../../assets/img/ether.png";
            }
            case 4: {
                return "../../assets/img/fire.png";
            }
            case 5: {
                return "../../assets/img/water.png";
            }
            default: {
                return "../../assets/img/new_moon.svg";
            }
        }
    }


}