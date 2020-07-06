import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction';
import { Essence } from 'src/app/shared/classes/essence/essence';
import { Biome } from 'src/app/shared/classes/biome/biome';
import { Rarity } from 'src/app/shared/classes/rarity/rarity';
import { DamageType } from 'src/app/shared/classes/damage-type/damage-type';
import { Ingredient } from 'src/app/shared/classes/ingredient/ingredient';
import { SaveType } from 'src/app/shared/classes/save-type/save-type';
import { Concoction } from 'src/app/shared/classes/concoction/concoction';

@Component({
  selector: 'app-alchemy-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class AlchemyInventoryPage implements OnInit {

  params: Params;
  generated: string = "Not Generated";
  checkjson: Concoction[];
  baseConcoctions: BaseConcoction[];

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    this.database.initialiseSubject.subscribe(() => {
      this.generated = "Generated";
    })
  }

  ngAfterViewInit() {
    console.debug('in enter function')
    this.getBaseConcoctions();
  }

  getBaseConcoctions() {
    this.database.getBaseConcoctions()
      .then((result) => {
        this.baseConcoctions = result;
        console.debug(this.baseConcoctions);
      })
  }
}
