import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Essence} from '../../shared/classes/essence/essence';

interface DisplayItem{
    name: string;
    baseEssences: Essence[];
}

@Component({
    selector: 'app-item-detail-modal',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.scss']
})

export class ItemDetailModal implements OnInit{
    displayItem: DisplayItem;

    constructor(
        public modalCtrl: ModalController
    ){}

    @Input() item: any;

    ngOnInit() {
        this.displayItem = this.item as DisplayItem;
        console.debug(this.displayItem);
        console.debug(this.item);
    }

    dismiss(){
        this.modalCtrl.dismiss();
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