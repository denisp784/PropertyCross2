import {Component, Input, trigger, transition, style, animate} from '@angular/core';
import {ShopService} from '../../ShopService';
import {ISection} from '../../models/ISection';
import {DialogService} from '../../dialogModule/dialogService';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {StorageService} from '../../StorageService';
import {AuthService} from '../../AuthService';

@Component({
    selector: 'sections',
    templateUrl: 'sections.template.html',
    styleUrls: ['sections.less']
})
export class SectionsComponent {
    @Input() sections: ISection[];
    showCategoryFlag: boolean = false;

    constructor(private dialogService: DialogService,
                private shopService: ShopService,
                private storageService: StorageService,
                private authService: AuthService) {
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
            .flatMap(() => this.shopService.getSections())
            .subscribe((sections: ISection[]) => {
                    this.sections = sections;
                }
            );
        event.stopPropagation();
    }
}
