import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { DatabaseService } from '../../shared/services/database.service';
import { BaseConcoction } from '../../shared/classes/base-concoction/base-concoction';
import { Concoction } from '../../shared/classes/concoction/concoction';
import {ModalController} from '@ionic/angular';
import {BrewComponent} from '../brew/brew.page';

@Component({
    selector: 'app-brew-select',
    templateUrl: './brewSelect.page.html',
    styleUrls: ['./brewSelect.page.scss'],
})
export class BrewSelectPage implements OnInit {
    baseConcoction: number;
    concoction: number;

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
        var concoctionItem = this.concoctionList.filter(c => c.id === this.concoction);
        var baseConcoctionItem = this.baseConcoctionList.filter(c => c.id === this.baseConcoction);

        this.reset();

        const modal = await this.modalController.create({
            component: BrewComponent,
            swipeToClose: true,
            componentProps: {
                'concoction': concoctionItem,
                'baseConcoction': baseConcoctionItem
            }
        })

        return await modal.present();
    }

    reset(){
        this.baseConcoction = null;
        this.concoction = null;
    }

}