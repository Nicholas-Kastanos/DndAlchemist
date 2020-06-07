import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './shared/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public alchemyPages = [
    {
      title: 'Inventory',
      url: '/alchemy',
      icon: 'mail'
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private database: DatabaseService
  ) {
    this.initializeApp();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.database.initialise().then(() => {
        SplashScreen.hide();
      })
      .catch(() => {
        console.error("Critical database init failure encountered!")
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('alchemy/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.alchemyPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
