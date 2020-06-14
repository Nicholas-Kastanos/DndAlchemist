import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService, Essance } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-alchemy-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class AlchemyInventoryPage implements OnInit {

  params: Params;
  generated: string = "Not Generated";
  essances: Essance[];

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

}
