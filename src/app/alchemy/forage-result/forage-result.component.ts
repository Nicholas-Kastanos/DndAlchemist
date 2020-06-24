import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ingredient} from '../../shared/classes/ingredient/ingredient';

@Component({
    selector: 'app-forage-result',
    templateUrl: './forage-result.component.html',
    styleUrls: ['./forage-result.component.scss']
})
export class ForageResultComponent implements OnInit{

    constructor(
        public modalCtrl: ModalController
    ){
        
    }

    @Input() ingredients: Ingredient[]

    ngOnInit() {
    }

    dismiss() {
        this.modalCtrl.dismiss()
    }

    addToInventory(){
        console.log('add')
        this.dismiss();
    }
}