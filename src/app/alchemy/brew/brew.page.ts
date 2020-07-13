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

    ingredients: Ingredient[] = [];

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
                this.ingredients = result;
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
        this.brewService.selectItem(item, item.checked);
        this.updateData();
    }

    dismiss() {
        this.modalCtrl.dismiss();
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