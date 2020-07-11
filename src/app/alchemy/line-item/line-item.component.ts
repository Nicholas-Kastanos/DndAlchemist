import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ItemDetailModal} from '../item-detail/item-detail.component';
import {Essence} from '../../shared/classes/essence/essence.class';

interface DisplayItem {
    name: string;
    //baseEssences: Essence[];
}

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.scss']
})

export class LineItem implements OnInit{
    displayItem: DisplayItem;

    constructor(
        public modalController: ModalController
    ) {}

    @Input() item: any;
    @Input() itemType: string;

    ngOnInit() {
        this.displayItem = this.item as DisplayItem;
    }

    async openDetails(){
        console.log("opening details")
        const modal = await this.modalController.create({
            component: ItemDetailModal,
            swipeToClose: true,
            cssClass: 'modal-class',
            showBackdrop: true,
            backdropDismiss: true,
            componentProps: {
                'item': this.item
            }
        });

        return await modal.present();
    }

}