import {Component, OnInit} from "@angular/core";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {CookieService} from "../../CookieService";
import {StorageService} from "../../StorageService";
import {ShopService} from "../../ShopService";
import {AuthService} from "../../AuthService";


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
                private storageService: StorageService) {

    }

    showLoginDialog() {
        const loginDialog = dialogConfigs.loginDialogConfig;

        this.dialogService.showDialog(loginDialog)
            .subscribe(() => {

            })

    }

    logout() {
        this.cookieService.deleteCookie('auth');
        this.shopService.checkUserRole();
        this.authService.role = '';
        console.log(this.storageService.isAdmin());
    }

}
