import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-codestyle',
    templateUrl: './codestyle.component.html',
    styleUrls: ['./codestyle.component.css']
})
export class CodestyleComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    addCodeStyle() {
        alert('This is a simple Alert');
    }
}
