import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-forage',
    templateUrl: './forage.page.html',
    styleUrls: ['./forage.page.scss'],
})
export class ForagePage implements OnInit {
    private forageInput: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.forageInput = this.formBuilder.group({
            forageCheck: ['']
        });
    }
    
    ngOnInit() {}

    

    submit(){
        console.log("form submitted");
    }

}