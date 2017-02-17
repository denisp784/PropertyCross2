import {Component, Input} from "@angular/core";
import {ShopService} from "../ShopService";
import {ISection} from "../models/ISection";
import {DialogService} from "../dialogModule/dialogService";
import {dialogConfigs} from "../dialogs/dialogs.config";

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
    
    constructor(private dialogService: DialogService,
                private shopService: ShopService) {
    }
    
    deleteSection(sectionId: number) {
        this.shopService.deleteSection(sectionId)
            .then((sections: ISection[]) => {
                this.sections = sections;
            })
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
