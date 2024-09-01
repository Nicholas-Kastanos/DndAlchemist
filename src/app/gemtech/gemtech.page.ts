import { Component, OnInit } from '@angular/core';
import SwiperCore from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([IonicSlides])

@Component({
  selector: 'app-gemtech',
  templateUrl: './gemtech.page.html',
  styleUrls: ['./gemtech.page.scss'],
})
export class GemtechPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
