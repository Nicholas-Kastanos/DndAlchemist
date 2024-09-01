import {Component, OnInit} from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { BaseConcoction } from '../../shared/classes/base-concoction/base-concoction.class';
import { Concoction } from '../../shared/classes/concoction/concoction.class';
import {ModalController} from '@ionic/angular';
import {BrewComponent} from '../brew/brew.page';

@Component({
    selector: 'app-brew-select',
    templateUrl: './brewSelect.page.html',
    styleUrls: ['./brewSelect.page.scss'],
})
export class BrewSelectPage implements OnInit {
    baseConcoction: string;
    concoction: string;

    baseConcoctionList: BaseConcoction[];
    concoctionList: Concoction[];

    constructor(
        private database: DatabaseService,
        private modalController: ModalController
    ) {}
    
    ngOnInit() {
        this.database.initialiseSubject.subscribe(() => {
            this.database.getBaseConcoctions()
                .then((result) => {
                    this.baseConcoctionList = result;
                })
            this.database.getConcoctions()
                .then((result) => {
                    this.concoctionList = result;
                })
        })
    }

    async submit(){
        console.debug(this.concoction)
        var selectedConcoction: Concoction;
        this.concoctionList.forEach(concoction => {
            if(concoction.name == this.concoction){
                selectedConcoction = concoction;
            }
        });
        var selectedBaseConcoction: BaseConcoction; 
        this.baseConcoctionList.forEach(base => {
            if(base.name == this.baseConcoction){
                selectedBaseConcoction = base;
            }
        });
        console.debug(this.concoctionList.filter(c => c.name == this.concoction))
        this.reset();
        const modal = await this.modalController.create({
            component: BrewComponent,
            swipeToClose: true,
            componentProps: {
                'concoction': selectedConcoction,
                'baseConcoction': selectedBaseConcoction
            }
        })

        return await modal.present();
    }

    reset(){
        this.baseConcoction = null;
        this.concoction = null;
    }

}