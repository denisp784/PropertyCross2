import {Injectable} from "@angular/core";
import {ShopService} from "./ShopService";
import {CookieService} from "./CookieService";
import {Subject} from "rxjs";

const hasManageRole = {
    ROLE_ADMIN: true,
    ROLE_MANAGER: true
};

@Injectable()
export class AuthService {
    onRoleChange = new Subject();
    private _role: string;

    constructor(private shopService: ShopService,
                private cookieService: CookieService) {
    }

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
        this.onRoleChange
            .next(value);
    }

    isManager(): boolean {
        return !!hasManageRole[this.role];
    }

    login(): boolean {
        if (this.cookieService.getCookie('auth')) {
            this.shopService.checkUserRole()
                .then((data) => {
                    console.log(!!hasManageRole[data.role]);
                    this.role = data.role;
                });
        } else {
            return false;
        }
    }
}
