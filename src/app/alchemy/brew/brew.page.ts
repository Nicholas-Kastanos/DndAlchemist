import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ingredient} from '../../shared/classes/ingredient/ingredient';
import {BaseConcoction} from '../../shared/classes/base-concoction/base-concoction';
import {Concoction} from '../../shared/classes/concoction/concoction';
import {DatabaseService} from '../../shared/services/database.service';

@Component({
    selector: 'app-brew',
    templateUrl: './brew.page.html',
    styleUrls: ['./brew.page.scss'],
})

export class BrewComponent implements OnInit {

    ingredients: Ingredient[];

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
    }
}