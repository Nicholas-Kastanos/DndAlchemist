import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-forage',
    templateUrl: './forage.page.html',
    styleUrls: ['./forage.page.scss'],
})
export class ForagePage implements OnInit {
    private forageInput: FormGroup;
    indeterminateState: boolean;
    checkParent: boolean;
    biomes: any[];

    constructor(private formBuilder: FormBuilder) {
        this.forageInput = new FormGroup({
          forageCheck: new FormControl(''),
          biomeList: new FormControl('')
        })

        this.forageInput = this.formBuilder.group({
            forageCheck: ['value'],
            biomeList: this.formBuilder.array([], [Validators.required])
        });
        this.biomes = [
            {value:"Arctic", checked: false}, 
            {value:"Coast", checked: false},
            {value:"Desert", checked: false},
            {value:"Forest", checked: false},
            {value:"Grassland", checked:false},
            {value:"Hill", checked: false},
            {value:"Mountain", checked: false},
            {value:"Swamp", checked: false},
            {value:"Underdark", checked: false}
        ]
    }
    
    ngOnInit() {}

    updateCheckControl(cal, o){
      if (o.checked){
        cal.push(new FormControl(o.value));
      }else{
        cal.controls.forEach((item: FormControl, index) => {
          if (item.value == o.value){
            cal.removeAt(index);
            return;
          }
        })
      }
    }

    onLoadCheckboxStatus() {
      const biomeList: FormArray = this.forageInput.get('biomeList') as FormArray;
      this.biomes.forEach(o => {
        this.updateCheckControl(biomeList, o);
      })
    }

    onSelectionChange(e, i){
      const biomeList: FormArray = this.forageInput.get('biomeList') as FormArray;
      this.biomes[i].checked = e.target.checked;
      this.updateCheckControl(biomeList, e.target);
    }

    submit(){
        console.log("form submitted");
        console.log(this.forageInput.value);
    } 

}