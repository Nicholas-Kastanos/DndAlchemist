import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-brew-select',
    templateUrl: './brewSelect.page.html',
    styleUrls: ['./brewSelect.page.scss'],
})
export class BrewSelectPage implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}
    
    ngOnInit() {}

    goToBrew(){
        this.router.navigate(['brew/brew-potion'], {relativeTo: this.route})
    }

}