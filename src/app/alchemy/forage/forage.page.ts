import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ForageService } from '../services/forage.service';
import { Biome } from '../../shared/classes/biome/biome';
import { DatabaseService } from '../../shared/services/database.service';
import { ForageResultComponent } from '../forage-result/forage-result.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-forage',
  templateUrl: './forage.page.html',
  styleUrls: ['./forage.page.scss'],
})
export class ForagePage implements OnInit {
  private forageInput: FormGroup;
  indeterminateState: boolean;
  checkParent: boolean;
  biomes: Biome[];
  biomeChecklist: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private forageService: ForageService,
    private database: DatabaseService,
    private modalController: ModalController
  ) {

    this.forageInput = this.formBuilder.group({
      forageCheck: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit() {
    this.database.initialiseSubject.subscribe(() => {
      this.database.getBiomes()
        .then((result) => {
          for (var x = 0; x < result.length; x++) {
            var biome = { biome: result[x], checked: false }
            this.biomeChecklist.push(biome);
          }
        })
    })
  }

  check(obj) {
    obj.checked = obj.checked == true ? false : true;
  }

  getBiomesSelected() {
    var biomeIds: number[] = [];
    this.biomeChecklist.forEach(biome => {
      if (biome.checked == true) {
        biomeIds.push(biome.biome.id);
      }
    })
    return biomeIds
  }

  resetForm(){
    this.biomeChecklist.forEach(biome => {
      if (biome.checked == true) {
        biome.checked = false;
      }
    })
    this.forageInput.reset();
  }

  async submit() {
    // to do add a toaster for form notifications
    var biomes = this.getBiomesSelected();
    if (this.forageInput.invalid) {
      console.debug("need forage check")
    } else if (biomes.length === 0) {
      console.debug('pick biomes')
    }
    else {
      var ingredients = this.forageService.forage(this.forageInput.get('forageCheck').value, biomes);
      //this.resetForm();
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