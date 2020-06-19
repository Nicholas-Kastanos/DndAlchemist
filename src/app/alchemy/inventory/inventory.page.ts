import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction';
import { Essence } from 'src/app/shared/classes/essence/essence';
import { Biome } from 'src/app/shared/classes/biome/biome';
import { Rarity } from 'src/app/shared/classes/rarity/rarity';
import { DamageType } from 'src/app/shared/classes/damage-type/damage-type';

@Component({
  selector: 'app-alchemy-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class AlchemyInventoryPage implements OnInit {

  params: Params;
  generated: string = "Not Generated";
  checkjson: DamageType[];
  baseConcoctions: BaseConcoction[];

  testList: any[] = [
    {"name": "one"},
    {"name": "two"}
  ]

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    if(this.database.migrationTableCreated()){
      this.generated = "Generated";
    }
  }

  check(){
    let checkB = this.database.migrationTableCreated();
    console.log("checkB="+checkB);
    if(checkB){
      this.generated = "Generated";
    }
  }

  getCheckjson(){
    this.database.getDamageTypes()
    .then((result) => {
      this.checkjson = result;
    })
  }

  getBaseConcoctions(){
    this.database.getBaseConcoctions()
    .then((result) => {
      this.baseConcoctions = result;
      console.debug(this.baseConcoctions);
    })
  }

  updateBaseConcoctions(){
    this.database.updateBaseConcoctionsFromJSON()
    .then(() => {
    })
  }

}
