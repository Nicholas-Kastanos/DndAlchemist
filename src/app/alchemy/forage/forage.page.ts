import { Component, OnInit } from '@angular/core';
import { ForageService } from '../services/forage.service';
import { Biome } from '../../shared/classes/biome/biome.class';
import { DatabaseService } from '../../shared/services/database.service';
import { ForageResultComponent } from '../forage-result/forage-result.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forage',
  templateUrl: './forage.page.html',
  styleUrls: ['./forage.page.scss'],
})
export class ForagePage implements OnInit {
  biomes: Biome[];
  forageCheck: number;
  selectedBiomes: string[];

  constructor(
    private forageService: ForageService,
    private database: DatabaseService,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.database.initialiseSubject.subscribe(() => {
      this.database.getBiomes()
        .then((result) => {
          this.biomes = result;
        })
    })
  }

  resetForm(){
    this.forageCheck = null;
    this.selectedBiomes = null;
  }

  async submit() {
    // to do add a toaster for form notifications
    if(this.selectedBiomes == undefined || this.forageCheck == undefined){
      console.debug("form invalid");
    }else{
      var ingredients = this.forageService.forage(this.forageCheck, this.selectedBiomes);
      this.resetForm();
      const modal = await this.modalController.create({
        component: ForageResultComponent,
        swipeToClose: true,
        componentProps: {
          'ingredients': ingredients
        }
      })
      
      return await modal.present();
    }
  }
}