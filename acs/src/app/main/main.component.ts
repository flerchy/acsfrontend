import {Component, OnInit} from '@angular/core';
import {WebService} from "../web.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(private _webService: WebService) {
    }

    ngOnInit() {
    }

    logout() {
        this._webService.logout();
        window.location.reload();
    }
}
