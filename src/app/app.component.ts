import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './shared/services/database.service';
import { Character } from './shared/classes/character/character.class';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public alchemyPages = [
    {
      title: 'Alchemy',
      url: '/alchemy',
      icon: 'flask'
    },
    {
      title: 'Gemtech',
      url: '/gemtech',
      icon: 'cog'
    },
    {
      title: 'Calendar',
      url: '/calendar',
      icon: 'calendar'
    }
  ];

  characters$: Promise<Character[]>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private database: DatabaseService
  ) {
    this.initializeApp();
    this.characters$ = this.database.getCharacters();
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.database.initialise().then(() => {
        this.database.initialiseSubject.subscribe(() => {
          SplashScreen.hide();
        })
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
