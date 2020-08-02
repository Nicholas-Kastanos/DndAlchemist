import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './shared/services/database.service';
import { Character } from './shared/classes/character/character.class';
import { PopoverController } from '@ionic/angular';
import { CharacterSelectorComponent } from './components/character-selector/character-selector.component';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public static selectedCharacter$: ReplaySubject<Character> = new ReplaySubject<Character>(1);
  selectedCharacter?: Character;

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

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private database: DatabaseService,
    private popoverController: PopoverController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.database.initialise().then(() => {
        this.database.initialiseSubject.subscribe(() => {
          AppComponent.selectedCharacter$.pipe(tap((character: Character) => this.selectedCharacter = character ));
          SplashScreen.hide();
        });
      })
      .catch((err) => {
        console.error("Critical database init failure encountered!", err)
      });
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('alchemy/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.alchemyPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async openCharacterPopover(event: any){
    const popover = await this.popoverController.create({
      component: CharacterSelectorComponent,
      event: event,
      translucent: true,
      componentProps: {
        dismissPopover: () => {
          popover.dismiss();
        }
      }
    });
    return await popover.present();
  }
}
