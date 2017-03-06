import {Component} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {IUser} from "../../models/IUser";
import {ShopService} from "../../ShopService";
import {CookieService} from "../../CookieService";
import {AuthService} from "../../AuthService";
import {Observable} from "rxjs";

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

    switchRegister(): void {
        this.isRegister = !this.isRegister;
    }

    register() {
        /*        this.shopService.addUser(this.user)
         .then(() => {
         this.dialog.ok();
         console.log('Пользователь добавлен');
         })*/

    }

    cookiesAuth() {
        console.log('aaaa');
    }

    login() {

        this.shopService.checkUserExist(this.user.login)
            .flatMap(res => {
                    if (res) {
                        let value = "Basic " + btoa(this.user.login + ":" + this.user.password);
                        this.cookieService.setCookie('auth', value, 10, '');
                        return this.shopService.checkUserRole()
                            .catch((err) => {
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
                    this.cookieService.deleteCookie('auth');
                    console.log('err');
                    console.log(err);
                });













        /*            .then((response) => {
         let answer = response;
         if (answer) {
         return 'azaza';
         } else throw new Error('No login');
         })
         .then(answer => {
         console.log(answer);
         })
         .catch(error => {
         console.log(error);
         });*/

        /*        let value = "Basic " + btoa(this.user.login + ":" + this.user.password);
         console.log(value);
         this.cookieService.setCookie('auth', value, 10, '');
         this.authService.autoLogin();
         //this.dialog.ok();

         console.log(document.cookie);

         this.shopService.checkUserRole()
         .then((data) => {
         console.log(data);
         })*/
    }

}
