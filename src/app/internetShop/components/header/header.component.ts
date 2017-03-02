import {Component, OnInit} from "@angular/core";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";


@Component({
    selector: 'header',
    templateUrl: 'header.template.html',
    styleUrls: ['header.less']
})


export class HeaderComponent {

    constructor(private dialogService: DialogService) {

    }

    showLoginDialog() {
        const loginDialog = dialogConfigs.loginDialogConfig;

        this.dialogService.showDialog(loginDialog)
            .subscribe(() => {

            })

    }

}
