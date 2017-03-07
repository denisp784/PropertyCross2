import {Component} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {IUser} from "../../models/IUser";
import {ShopService} from "../../ShopService";
import {CookieService} from "../../CookieService";
import {AuthService} from "../../AuthService";
import {Observable} from "rxjs";
import {NgForm} from '@angular/forms';

@Component({
    selector: 'loginDialog',
    templateUrl: 'loginDialog.template.html',
    styleUrls: ['loginDialog.less']
})

export class LoginDialogComponent extends DialogAwareComponent {

    constructor(private shopService: ShopService,
                private cookieService: CookieService,
                private authService: AuthService) {
        super()
    }

    user: IUser = <IUser>{};

    isRegister: boolean = false;
    isCorrectLogin: boolean = true;
    isCorrectPassword: boolean = true;

    switchRegister(): void {
        this.isRegister = !this.isRegister;
    }

    register() {
        this.shopService.userRegistration(this.user)
            .subscribe(() => {
                console.log(this.user);
                this.dialog.ok();
                console.log('Пользователь добавлен');
            })

    }

    resetCorrectLogin() {
        if (!this.isCorrectLogin) {
            this.isCorrectLogin = true;
        }
    }

    resetCorrectPassword() {
        if (!this.isCorrectPassword) {
            this.isCorrectPassword = true;
        }
    }

    logIn() {
        this.shopService.checkUserExist(this.user.login)
            .flatMap(res => {
                    if (res) {
                        let value = "Basic " + btoa(this.user.login + ":" + this.user.password);
                        this.cookieService.setCookie('auth', value, 10, '');
                        return this.shopService.checkUserRole()
                            .catch(() => {
                                return new Observable(observer => observer.error('wrong password'));
                            });
                    }
                    return new Observable(observer => observer.error('login not found'));
                }
            )
            .subscribe(
                res => {
                    this.authService.autoLogin();
                    this.dialog.ok();
                },
                err => {
                    if (err === 'login not found') {
                        this.isCorrectLogin = false;
                    }

                    if (err === 'wrong password') {
                        this.isCorrectPassword = false;
                    }

                    this.cookieService.deleteCookie('auth');
                });
    }


}
