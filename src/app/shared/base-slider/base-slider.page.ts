import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-slider',
  templateUrl: './base-slider.page.html',
  styleUrls: ['./base-slider.page.scss'],
})
export class BaseSliderPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor() { }

  ngOnInit() {
  }

  

}
