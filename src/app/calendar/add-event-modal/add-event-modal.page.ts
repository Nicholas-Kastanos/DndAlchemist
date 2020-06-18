import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-add-event-modal'
})

export class AddEventModal{
    constructor(
        public modalCtrl: ModalController
    ){}

    @Input() month: string;
    @Input() day: number;
    @Input() year: number;

    dismiss(){
        this.modalCtrl.dismiss();
    }
}