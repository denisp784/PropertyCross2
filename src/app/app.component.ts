import {Component, OnInit} from '@angular/core';
import {CookieService} from "./internetShop/CookieService";
import {ShopService} from "./internetShop/ShopService";
import {AppService} from "./app.service";
import {StorageService} from "./internetShop/StorageService";
import {AuthService} from "./internetShop/AuthService";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    constructor(private shopService: ShopService,
        private cookieService: CookieService,
        private storageService: StorageService,
        private authService: AuthService) {
    }

    ngOnInit() {

        this.cookieService.deleteCookie('auth');
        this.authService.autoLogin();



    }

    checkCookie() {

        //this.cookieService.setCookie('auth', 'Basic '  + btoa('admin' + ':' + 'admin'), 10, 'aaa');
    }



    title = 'app works!';
}
