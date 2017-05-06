import {Component, OnInit} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import * as _ from 'lodash';

@Component({
    selector: 'category-group-dialog',
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
                .subscribe((categoryGroup: ICategoryGroup) => {
                        this.categoryGroup = categoryGroup;
                    }
                );
        }
    }

    upload() {
        this.categoryGroup.sectionId = this.storageService.lastSection;
        const categoryGroup = _.assign({}, this.categoryGroup);
        categoryGroup.categories = null;

        this.shopService.addCategoryGroup(categoryGroup)
            .subscribe(() => this.dialog.ok());
    }

    isAddDisabled(categoryGroupName, priority): boolean {
        return categoryGroupName.invalid || priority.invalid;
    }

    deleteGroup() {
        this.shopService.deleteCategoryGroup(this.categoryGroup.id)
            .subscribe(() => this.dialog.ok());
    }
}
