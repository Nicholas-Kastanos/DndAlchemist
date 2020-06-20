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
        console.log('dismiss')
        this.modalCtrl.dismiss();
    }
}