import {Component} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {IUser} from "../../models/IUser";
import {ShopService} from "../../ShopService";

@Component({
    selector: 'loginDialog',
    templateUrl: 'loginDialog.template.html',
    styleUrls: ['loginDialog.less']
})

export class LoginDialogComponent extends DialogAwareComponent {

    constructor(private shopService:ShopService) {
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

    }

}
