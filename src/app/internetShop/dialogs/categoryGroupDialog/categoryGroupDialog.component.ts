import {Component, OnInit} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import * as _ from 'lodash';

@Component({
    selector: 'categoryGroupDialog',
    templateUrl: 'categoryGroupDialog.template.html',
    styleUrls: ['categoryGroupDialog.less']
})

export class CategoryGroupDialogComponent extends DialogAwareComponent implements OnInit {
    categoryGroup: ICategoryGroup;

    constructor(private shopService: ShopService,
                private storageService: StorageService) {
        super();
        this.initNewGroup();
    }

    private initNewGroup() {
        this.categoryGroup = <ICategoryGroup>{};
    }

    ngOnInit() {
        this.categoryGroup.priority = 1;
        if (this.currentData.id) {
            this.shopService.getCategoryGroupById(this.currentData.id)
                .then((categoryGroup: ICategoryGroup) => {
                        this.categoryGroup = categoryGroup;
                    }
                )
        }
    }

    upload() {
        this.categoryGroup.sectionId = this.storageService.lastSection;
        const categoryGroup = _.assign({}, this.categoryGroup);
        categoryGroup.categories = null;

        this.shopService.addCategoryGroup(categoryGroup)
            .then(() => this.dialog.ok());
    }

    isAddDisabled(categoryGroupName, priority): boolean {
        /*return !this.categoryGroup.categoryGroupName || !this.categoryGroup.priority;*/

        return categoryGroupName.invalid || priority.invalid;
    }

    deleteGroup() {
        this.shopService.deleteCategoryGroup(this.categoryGroup.id)
            .then(() => this.dialog.ok());
    }
}
