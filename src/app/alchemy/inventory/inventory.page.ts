import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { BaseConcoction } from 'src/app/shared/classes/base-concoction/base-concoction';
import { Essance } from 'src/app/shared/classes/essance/essance';

@Component({
  selector: 'app-alchemy-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class AlchemyInventoryPage implements OnInit {

  params: Params;
  generated: string = "Not Generated";
  essances: Essance[];
  baseConcoctions: BaseConcoction[];

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

  getEssances(){
    this.database.getEssances()
    .then((result) => {
      this.essances = result;
    })
  }

  getBaseConcoctions(){
    this.database.getBaseConcoctions()
    .then((result) => {
      this.baseConcoctions = result;
    })
  }

  updateBaseConcoctions(){
    this.database.updateBaseConcoctionsFromJSON()
    .then(() => {
    })
  }

}
