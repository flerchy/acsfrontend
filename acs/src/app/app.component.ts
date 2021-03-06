import {Component, OnInit} from '@angular/core';
import {WebService} from './web.service';
import {Router, NavigationEnd} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isAuthenticated = false;

    constructor(private _router: Router, private _webService: WebService) {
    }

    ngOnInit() {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let urlTree = this._router.parseUrl(this._router.url);
                let token = urlTree.queryParams['token'];
                console.log('Token: ' + token);
                if (token != null) {
                    this._webService.setToken(token);
                    console.log('Token was set');
                }
                this.isAuthenticated = this._webService.isAuthenticated();
                this._router.navigate(['']);
            }
        });
    }
}
