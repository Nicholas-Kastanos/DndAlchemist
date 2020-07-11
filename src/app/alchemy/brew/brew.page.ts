import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from '../../shared/classes/ingredient/ingredient';
import { BaseConcoction } from '../../shared/classes/base-concoction/base-concoction';
import { Concoction } from '../../shared/classes/concoction/concoction';
import { DatabaseService } from '../../shared/services/database.service';
import { Essence } from '../../shared/classes/essence/essence';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BrewService } from '../services/brew.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
    selector: 'app-brew',
    templateUrl: './brew.page.html',
    styleUrls: ['./brew.page.scss'],
})

export class BrewComponent implements OnInit {

    ingredients: Ingredient[] = [];
    requiredIngredients: string[] = [];

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
        this.concoction.requiredIngredients.forEach(required => {
            var requiredString = "";
            for(var x = 0; x < required.ingredients.length-1; x++){
                requiredString = requiredString + required.ingredients[x].name + " or ";
            }
            requiredString = requiredString + required.ingredients[required.ingredients.length-1];

            this.requiredIngredients.push(requiredString);
        })
    }

    select(item: any) {
        this.brewService.selectItem(item, item.checked);
    }

    dismiss() {
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