import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction';
import { Ingredient } from 'src/app/shared/classes/ingredient/ingredient';
import { Concoction } from 'src/app/shared/classes/concoction/concoction';

@Component({
    selector: 'app-full-list',
    templateUrl: './full-list.page.html',
    styleUrls: ['./full-list.page.scss']
})
export class FullListPage implements OnInit {

    baseConcoctions: BaseConcoction[];
    ingredients: Ingredient[];
    concoctions: Concoction[];

    baseConcoctionsDisplay: BaseConcoction[] = [];
    ingredientsDisplay: Ingredient[] = [];
    concoctionDisplay: Concoction[] = [];

    constructor(
        private database: DatabaseService
    ) { }

    ngOnInit() {
        this.database.initialiseSubject.subscribe(() => {
            this.database.getBaseConcoctions()
                .then((result) => {
                    this.baseConcoctions = result;
                })
            this.database.getIngredients()
                .then((result) => {
                    this.ingredients = result;
                })
            this.database.getConcoctions()
                .then((result) => {
                    this.concoctions = result;
                })
        })
    }

    toggleBase(){
        this.baseConcoctionsDisplay = this.baseConcoctionsDisplay.length === 0 ?
            this.baseConcoctions :
            [];
    }

    toggleIngredients(){
        this.ingredientsDisplay = this.ingredientsDisplay.length === 0 ?
            this.ingredients :
            [];
    }

    toggleConcoctions(){
        this.concoctionDisplay = this.concoctionDisplay.length === 0 ?
            this.concoctions :
            [];
    }

}