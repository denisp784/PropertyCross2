import {
    Component, ViewChildren, AfterViewInit, ElementRef, ViewChild, trigger, transition, style,
    animate
} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {IUser} from "../../models/IUser";
import {ShopService} from "../../ShopService";
import {CookieService} from "../../CookieService";
import {AuthService} from "../../AuthService";
import {Observable, Subject} from "rxjs";
import {NgForm, NgModel} from '@angular/forms';
import {StorageService} from '../../StorageService';

@Component({
    selector: 'login-dialog',
    templateUrl: 'loginDialog.template.html',
    styleUrls: ['loginDialog.less'],
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

export class LoginDialogComponent extends DialogAwareComponent {

    constructor(private shopService: ShopService,
                private cookieService: CookieService,
                private authService: AuthService,
                private storageService: StorageService) {
        super();
    }

    @ViewChild('login') login: ElementRef;
    @ViewChild('password') password: ElementRef;

    @ViewChild('regLogin') regLogin: any;
    @ViewChild('regPassword') regPassword: any;
    @ViewChild('email') email: any;
    @ViewChild('fio') fio: any;
    @ViewChild('address') address: any;
    @ViewChild('registerForm') registerForm: any;

    user: IUser = <IUser>{};

    isRegister = false;
    isCorrectLogin = true;
    isCorrectPassword = true;
    onLogin = new Subject();
    showAlert = false;
    alertText: string;

    switchRegister(): void {
        this.isRegister = !this.isRegister;
    }

    register() {
        this.shopService.userRegistration(this.user)
            .subscribe(() => {
                this.dialog.ok();
                console.log('Пользователь добавлен');
            });

    }

    resetCorrectLogin(event) {
        if (!this.isCorrectLogin && event.keyCode !== 13) {
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
                () => {
                    this.authService.autoLogin();
                    this.dialog.ok();
                },
                err => {
                    if (err === 'login not found') {
                        this.isCorrectLogin = false;
                        this.onLogin.next();
                    }

                    if (err === 'wrong password') {
                        this.isCorrectPassword = false;
                        this.onLogin.next();
                    }

                    this.cookieService.deleteCookie('auth');
                });

        this.storageService.alertText = 'Вы успешно авторизованы';
        this.storageService.showAlert = true;
        setTimeout(() => this.storageService.showAlert = false, 3000);
    }

    enterEvent() {
        if (this.isRegister) {
            let regLogin = new ElementRef(this.regLogin.valueAccessor._elementRef.nativeElement);
            let regPassword = new ElementRef(this.regPassword.valueAccessor._elementRef.nativeElement);
            let email = new ElementRef(this.email.valueAccessor._elementRef.nativeElement);
            let fio = new ElementRef(this.fio.valueAccessor._elementRef.nativeElement);
            let address = new ElementRef(this.address.valueAccessor._elementRef.nativeElement);

            this.regLogin.nativeElement.markAsDirty();

            if (this.regLogin.valid) {
                regPassword.nativeElement.focus();
            }

            if (this.regLogin.valid && this.regPassword.valid) {
                email.nativeElement.focus();
            }

        }

        if (!this.isRegister) {
            this.logIn();
            this.onLogin.subscribe(() => {
                if (this.isCorrectLogin){
                    this.password.nativeElement.focus();
                }
            });
        }
    }


}
