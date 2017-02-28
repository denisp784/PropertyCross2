import {Component, Input, trigger, transition, style, animate, OnInit} from "@angular/core";
import {ShopService} from "../../ShopService";
import {ISection} from "../../models/ISection";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {StorageService} from "../../StorageService";
import {AuthService} from "../../AuthService";

@Component({
    selector: 'sections',
    templateUrl: 'sections.template.html',
    styleUrls: ['sections.less']
})
export class SectionsComponent implements OnInit {
    @Input() sections: ISection[];
    showCategoryFlag: boolean = false;
    isAdmin: boolean;

    constructor(private dialogService: DialogService,
                private shopService: ShopService,
                private storageService: StorageService,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAdmin = this.authService.isManager(this.authService.getUserRole());
    }

    switchCategory(sectionId: number) {
        if (this.storageService.lastSection !== sectionId) {
            this.storageService.lastSection = sectionId;
            this.showCategoryFlag = true;
        } else {
            this.showCategoryFlag = !this.showCategoryFlag;
        }
    }

    showSectionDialog(event, sectionId: number) {
        const sectionDialog = dialogConfigs.sectionDialogConfig;

        sectionDialog.data = {
            isEditFlag: arguments.length === 2,
            sectionId
        };

        sectionDialog.title = arguments.length === 2 ? 'Изменение секции' : 'Добавление секции';

        this.dialogService.showDialog(sectionDialog)
            .subscribe(() => {
                this.shopService.getSections()
                    .then((sections: ISection[]) => {
                            this.sections = sections;
                        }
                    )
            });
        event.stopPropagation();
    }
}
