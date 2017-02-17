import {Component, Input} from "@angular/core";
import {ShopService} from "../ShopService";
import {ISection} from "../models/ISection";
import {DialogService} from "../dialogModule/dialogService";
import {dialogConfigs} from "../dialogs/dialogs.config";
import {StorageService} from "../StorageService";

const close = require('../resource/images/closeDark.png');

@Component({
    selector: 'sections',
    templateUrl: 'sections.template.html',
    styleUrls: ['sections.less']
})
export class SectionsComponent {
    @Input() sections: ISection[];
    addSetionDialog = dialogConfigs.addSectionDialog;
    closeIcon = close;


    showCategory: boolean = false;

    constructor(private dialogService: DialogService,
                private shopService: ShopService,
                private storageService: StorageService) {
    }
    
    deleteSection(event, sectionId: number) {
        this.shopService.deleteSection(sectionId)
            .then((sections: ISection[]) => {
                this.sections = sections;
            });
        event.stopPropagation();
    }

    switchCategory(sectionId: number) {
        if (this.storageService.lastSection !== sectionId) {
            this.storageService.lastSection = sectionId;
            this.showCategory = true;
        } else {
            this.showCategory = !this.showCategory;
        }
    }
    
    showAddSectionDialog() {
        this.dialogService.showDialog(this.addSetionDialog)
            .subscribe(() => {
                this.shopService.getSections()
                .then((sections: ISection[]) => {
                        this.sections = sections;
                    }
                )
            });
    }
}
