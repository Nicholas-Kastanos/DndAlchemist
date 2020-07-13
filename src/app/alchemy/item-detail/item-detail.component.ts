import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Essence, Essences} from '../../shared/classes/essence/essence.class';
import {Biome} from '../../shared/classes/biome/biome.class';

interface DisplayItem{
    name: string;
    baseEssences: Essence[];
    essences: Essence[];
    locations: Biome[];
    details?: string;
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
    }

    dismiss(){
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