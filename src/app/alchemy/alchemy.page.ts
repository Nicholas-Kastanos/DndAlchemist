import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alchemy',
  templateUrl: './alchemy.page.html',
  styleUrls: ['./alchemy.page.scss'],
})
export class AlchemyPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }

  

}