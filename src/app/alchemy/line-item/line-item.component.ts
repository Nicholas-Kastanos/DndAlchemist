import {Component, Input, OnInit} from '@angular/core';

interface DisplayItem {
    name: string;
}

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.scss']
})

export class LineItem implements OnInit{
    displayItem: DisplayItem;

    constructor() {}

    @Input() item: any;

    ngOnInit() {
        this.displayItem = this.item as DisplayItem;
        console.debug(this.displayItem);
        console.log(this.displayItem);
        console.debug(this.item);
        console.log(this.item);
    }

}