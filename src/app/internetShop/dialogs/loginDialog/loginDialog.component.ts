import {Component} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {IUser} from "../../models/IUser";
import {ShopService} from "../../ShopService";
import {CookieService} from "../../CookieService";
import {AuthService} from "../../AuthService";

@Component({
    selector: 'loginDialog',
    templateUrl: 'loginDialog.template.html',
    styleUrls: ['loginDialog.less']
})

export class LoginDialogComponent extends DialogAwareComponent {

    constructor(private shopService:ShopService,
                private cookieService: CookieService,
                private authService: AuthService) {
        super()
    }

    user: IUser = <IUser>{};

    isRegister: boolean = false;

    switchRegister(): void {
        this.isRegister = !this.isRegister;
    }

    register() {
        this.shopService.addUser(this.user)
            .then(() => {
                this.dialog.ok();
                console.log('Пользователь добавлен');
            })

    }

    login() {
        let value = "Basic " + btoa(this.user.login + ":" + this.user.password);
        console.log(value);
        this.cookieService.setCookie('auth', value, 10, '');
        this.authService.autoLogin();
        //this.dialog.ok();

        console.log(document.cookie);

        this.shopService.checkUserRole()
            .then((data) => {
                console.log(data);
            })
    }

}