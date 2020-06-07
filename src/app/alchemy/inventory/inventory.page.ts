import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-alchemy-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class AlchemyInventoryPage implements OnInit {

  params: Params;
  generated: string = "Not Generated";

  constructor(private route: ActivatedRoute, private database: DatabaseService) { }

  ngOnInit() {
    this.params = this.route.snapshot.params;
    if(this.database.created()){
      this.generated = "Generated";
    }
  }

  check(){
    let checkB = this.database.created();
    console.log("checkB="+checkB);
    if(checkB){
      this.generated = "Generated";
    }
  }

}
