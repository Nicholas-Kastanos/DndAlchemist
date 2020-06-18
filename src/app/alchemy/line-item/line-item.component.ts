import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-line-item',
    templateUrl: './line-item.component.html',
    styleUrls: ['./line-item.component.scss']
})

interface DisplayItem {
    name: string;
}

export class LineItem implements OnInit{
    displayItem: DisplayItem;

    constructor() {}

    @Input() item: any;

    ngOnInit() {
        this.displayItem = this.item as DisplayItem;
    }

}