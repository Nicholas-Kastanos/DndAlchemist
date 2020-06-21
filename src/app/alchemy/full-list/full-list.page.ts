import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/shared/services/database.service';
import {BaseConcoction} from 'src/app/shared/classes/base-concoction/base-concoction';
import {Ingredient} from 'src/app/shared/classes/ingredient/ingredient';

@Component({
    selector: 'app-full-list',
    templateUrl: './full-list.page.html',
    styleUrls: ['./full-list.page.scss']
})
export class FullListPage implements OnInit {

    baseConcoctions: BaseConcoction[];
    ingredients: Ingredient[];

    baseConcoctionsDisplay: BaseConcoction[];
    ingredientsDisplay: Ingredient[];

    constructor(
        private database: DatabaseService
    ) {}

    ngOnInit() {}

    loadData() {
        this.database.getBaseConcoctions()
        .then((result) => {
            this.baseConcoctions = result;
            this.baseConcoctionsDisplay = result;
        })
        this.database.getIngredients()
        .then((result) => {
            this.ingredients = result;
            this.ingredientsDisplay = result;
        })
    }
}