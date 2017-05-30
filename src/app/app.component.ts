import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {CookieService} from "./internetShop/CookieService";
import {ShopService} from "./internetShop/ShopService";
import {AppService} from "./app.service";
import {StorageService} from "./internetShop/StorageService";
import {AuthService} from "./internetShop/AuthService";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({transform: 'translateY(50%)', opacity: 0}),
                    animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
                ]),
                transition(':leave', [
                    style({transform: 'translateY(0)', opacity: 1}),
                    animate('500ms', style({transform: 'translateY(50%)', opacity: 0}))
                ])
            ]
        )
    ]
})

export class AppComponent implements OnInit {
    constructor(private shopService: ShopService,
        private cookieService: CookieService,
        private storageService: StorageService,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.autoLogin();
    }

    title = 'app works!';
}
