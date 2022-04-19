import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-add-event-modal',
    templateUrl: './add-event-modal.page.html',
    styleUrls: ['./add-event-modal.page.scss']
})

export class AddEventModal{
    constructor(
        public modalCtrl: ModalController
    ){}

    @Input() month: string;
    @Input() day: number;
    @Input() year: number;

    details: string;

    dismiss(){
        console.log('dismiss')
        this.modalCtrl.dismiss();
    }

    async submit(){
        console.debug("---------------------")
        console.debug(this.details)
        console.debug("---------------------")

        this.modalCtrl.dismiss()
    }
}