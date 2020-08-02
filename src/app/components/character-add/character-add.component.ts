import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss'],
})
export class CharacterAddComponent {

  formGroup: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      date: this.fb.group({
        day: ['', Validators.required],
        month: ['', Validators.required],
        year: ['', Validators.required]
      })
    });
   }


  submit(){
    console.debug(JSON.stringify(this.formGroup.value));
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }
}
