import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ingredient} from '../../shared/classes/ingredient/ingredient.class';
import {BaseConcoction} from '../../shared/classes/base-concoction/base-concoction.class';
import {Concoction} from '../../shared/classes/concoction/concoction.class';
import {DatabaseService} from '../../shared/services/database.service';
import {Essence} from '../../shared/classes/essence/essence.class';
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

    requiredCollection = {
        "ether": 0,
        "earth": 0,
        "fire": 0,
        "air": 0,
        "water": 0
    };

    selectedCollection = {
        "ether": 0,
        "earth": 0,
        "fire": 0,
        "air": 0,
        "water": 0
    }

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
                
        })

        this.baseConcoction.baseEssences.forEach(essence => {
            var item = {essence: essence, fulfilled: false}
            this.requiredEssences.push(item)
        })
        this.getRequired(this.baseConcoction.baseEssences);
        this.concoction.essences.forEach(essence => {
            var item = {essence: essence, fulfilled: false}
            this.requiredEssences.push(item)
        })
        this.getRequired(this.concoction.essences);

        this.newConcoction = this.concoction;
        console.debug(JSON.stringify(this.requiredCollection))
    }

    select(item: any){
        this.addChecked(item, item.checked);
        this.checkRequired()
        console.debug(JSON.stringify(this.requiredEssences));
    }

    addChecked(item: Ingredient, checked: boolean){
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
    }

    dismiss(){
        this.modalCtrl.dismiss();
    }

    checkRequired(){
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

    getRequired(essences: Essence[]){
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