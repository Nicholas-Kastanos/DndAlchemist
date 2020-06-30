import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ingredient} from '../../shared/classes/ingredient/ingredient';
import {BaseConcoction} from '../../shared/classes/base-concoction/base-concoction';
import {Concoction} from '../../shared/classes/concoction/concoction';
import {DatabaseService} from '../../shared/services/database.service';
import {Essence} from '../../shared/classes/essence/essence';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
    selector: 'app-brew',
    templateUrl: './brew.page.html',
    styleUrls: ['./brew.page.scss'],
})

export class BrewComponent implements OnInit {

    ingredients: Ingredient[] = [];

    newConcoction: Concoction;

    requiredEssences: any[] = [];
    selectedIngredients: Ingredient[] = [];

    constructor(
        public modalCtrl: ModalController,
        private database: DatabaseService
    ) {}

    @Input() concoction: Concoction;
    @Input() baseConcoction: BaseConcoction;

    ngOnInit() {
        this.database.initialiseSubject.subscribe(() => {
            this.database.getIngredients()
                .then((result) => {
                    this.ingredients = result;
                })
                this.baseConcoction.baseEssences.forEach(essence => {
                    var item = {essence: essence, fulfilled: false}
                    this.requiredEssences.push(item)
                })
                this.concoction.essences.forEach(essence => {
                    var item = {essence: essence, fulfilled: false}
                    this.requiredEssences.push(item)
                })
        })

        this.newConcoction = this.concoction;
    }

    checkRequired(){

    }

    select(item: any){
        console.debug(JSON.stringify(item))

        if(item.checked){
            console.debug("checked")
            this.selectedIngredients.push(item);
        }else{
            console.debug("unchecked")
            this.selectedIngredients = this.selectedIngredients.filter(i => i.id != item.id);
        }
    }

    getElement(elementId: number){
        // 1: air
        // 2 earth
        // 3 ether
        // 4 fire
        // 5 water
        switch(elementId){
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