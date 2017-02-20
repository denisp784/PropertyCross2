import {Component, Input, trigger, state, style, transition, animate} from "@angular/core";
import {ShopService} from "../ShopService";
import {ISection} from "../models/ISection";
import {DialogService} from "../dialogModule/dialogService";
import {dialogConfigs} from "../dialogs/dialogs.config";
import {StorageService} from "../StorageService";
//import {IDialogConfig} from "../dialogModule/IDialogConfig";

const close = require('../resource/images/closeDark.png');

@Component({
    selector: 'sections',
    templateUrl: 'sections.template.html',
    styleUrls: ['sections.less'],
/*    animations: [
        trigger('visibilityState', [
            state('false', style({maxHeight: 0, padding: 0})),
            state('true', style({maxHeight: '30px', padding: '6px 0 7px'})),
            transition('0 <=> 1', animate(300))
        ])
    ]*/
})
export class SectionsComponent {
    @Input() sections: ISection[];
    //addSectionDialog: IDialogConfig;
    //addSectionDialog = dialogConfigs.addSectionDialog;
    //closeIcon = close;


    showCategory: boolean = false;

    constructor(private dialogService: DialogService,
                private shopService: ShopService,
                private storageService: StorageService) {
    }
    


    switchCategory(sectionId: number) {
        if (this.storageService.lastSection !== sectionId) {
            this.storageService.lastSection = sectionId;
            this.showCategory = true;
        } else {
            this.showCategory = !this.showCategory;
        }
    }
    
    showAddSectionDialog(event, sectionId: number) {
        let addSectionDialog = dialogConfigs.addSectionDialog;
        let data = {
            isEdit: arguments.length === 2,
            sectionId
        };
        addSectionDialog.data = data;

        addSectionDialog.title = arguments.length === 2 ? 'Изменение секции' : 'Добавление секции';

        this.dialogService.showDialog(addSectionDialog)
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
