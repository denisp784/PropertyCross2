import {Component, Input} from "@angular/core";
import {ICategory} from "../models/ICategory";
import {ShopService} from "../ShopService";
import {DialogService} from "../dialogModule/dialogService";
import {dialogConfigs} from "../dialogs/dialogs.config";
import {StorageService} from "../StorageService";
import {ICategoryGroup} from "../models/ICategoryGroup";
import * as _ from 'lodash';

const close = require('../resource/images/closeDark.png');
const noImageIcon = require("../resource/images/noImageIcon.png");

@Component({
    selector: 'category',
    templateUrl: 'category.template.html',
    styleUrls: ['category.less']
})
export class CategoriesComponent {

    category: ICategory = <ICategory>{};


    constructor(private shopService: ShopService,
                private dialogService: DialogService,
                private storageService: StorageService) {
    }

    @Input() categoryGroup: any;

    showAddCategoryDialog(event, id) {
        this.storageService.lastGroup = this.categoryGroup.id;
        let addCategoryDialog = dialogConfigs.addCategoryDialog;

        let data = {
            isEdit: arguments.length === 2,
            id
        };

        addCategoryDialog.data = data;

        addCategoryDialog.title = arguments.length === 2 ? 'Изменение группы категорий' : 'Добавление группы категорий';

        this.dialogService.showDialog(addCategoryDialog)
            .subscribe(() => {
                this.shopService.getCategoryGroupById(this.categoryGroup.id)
                    .then((categoryGroup: ICategoryGroup) => {
                        this.categoryGroup = categoryGroup;
                        //this.storageService.cachedGroup[this.storageService.lastSection] = _.replace(this.storageService.cachedGroup[this.storageService.lastSection], {id: this.categoryGroup.id}, categoryGroup);
                        const groupIndex = _.findIndex(this.storageService.cachedGroup[this.storageService.lastSection], {id: this.categoryGroup.id});
                        this.storageService.cachedGroup[this.storageService.lastSection][groupIndex] = categoryGroup;
                        console.log(this.categoryGroup);
                        console.log(this.storageService.cachedGroup);
                        }
                    );
            });

        event.stopPropagation();
    }
}
