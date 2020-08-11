import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Month, CustomDate } from 'src/app/calendar/classes/custom-date.class';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.scss'],
})
export class CharacterAddComponent {
  months = Month;

  formGroup: FormGroup;
  dayControl: FormControl;

  constructor(
    public modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      date: this.fb.group({
        day: ['', [Validators.required, Validators.min(1)]],
        month: ['', Validators.required],
        year: ['', Validators.required]
      })
    });

    this.dayControl = (this.formGroup.get('date') as FormGroup).get('day') as FormControl;
  }

  updateMonth(event: any) {
    let month = event.target.value as number;
    console.log(CustomDate.Month(month).days)
    this.dayControl.setValidators([Validators.required, Validators.min(1), Validators.max(CustomDate.Month(month).days)]);
    this.dayControl.updateValueAndValidity();
  }

  submit() {
    console.debug(JSON.stringify(this.formGroup.value));
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }
}
