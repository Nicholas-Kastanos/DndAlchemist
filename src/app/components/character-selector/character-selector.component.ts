import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { Character } from 'src/app/shared/classes/character/character.class';
import { AppComponent } from 'src/app/app.component';
import { ModalController } from '@ionic/angular';
import { CharacterAddComponent } from '../character-add/character-add.component';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrls: ['./character-selector.component.scss'],
})
export class CharacterSelectorComponent implements OnInit {

  characters$: Promise<Character[]>;

  @Input() dismissPopover = () => {};

  constructor(
    private databaseService: DatabaseService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.characters$ = this.databaseService.getCharacters();
  }

  selectCharacter(selectedCharacter: Character){
    AppComponent.selectedCharacter$.next(selectedCharacter)
  }
  async newCharacter(){
    const modal  = await this.modalController.create({
      component: CharacterAddComponent,
      swipeToClose: true,
      cssClass: 'modal-class',
      showBackdrop: true,
      backdropDismiss: true
    })
    this.dismissPopover();
    return await modal.present();
  }
}
