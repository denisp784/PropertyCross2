import {Component, OnInit} from "@angular/core";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {CookieService} from "../../CookieService";
import {StorageService} from "../../StorageService";
import {ShopService} from "../../ShopService";
import {AuthService} from "../../AuthService";
import {Router} from '@angular/router';


@Component({
    selector: 'header',
    templateUrl: 'header.template.html',
    styleUrls: ['header.less']
})


export class HeaderComponent {

    constructor(private dialogService: DialogService,
                private cookieService: CookieService,
                private authService: AuthService,
                private shopService: ShopService,
                private storageService: StorageService,
                private router: Router) {

    }

    showLoginDialog() {
        const loginDialog = dialogConfigs.loginDialogConfig;

        this.dialogService.showDialog(loginDialog)
            .subscribe(() => {
            });
    }

    logout() {
        this.cookieService.deleteCookie('auth');
        this.authService.role = '';

        this.storageService.alertText = 'Вы вышли из профиля';
        this.storageService.showAlert = true;
        setTimeout(() => this.storageService.showAlert = false, 3000);
    }

    openCart(): void {
        this.router.navigate(['cart']);
    }

}
