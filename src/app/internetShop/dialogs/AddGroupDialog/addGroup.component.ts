import {Component, OnInit, trigger, state, transition, style, animate} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService";
import {Router} from "@angular/router";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import * as _ from 'lodash';

@Component({
    selector: 'addGroup',
    templateUrl: 'addGroup.template.html',
    styleUrls: ['addGroup.less']
})

export class AddGroupComponent extends DialogAwareComponent implements OnInit{
    categoryGroup: ICategoryGroup;

    constructor(private appService: AppService,
                private shopService: ShopService,
                private storageService: StorageService,
                private router: Router) {
        super();
        this.initNewGroup();
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

    isAddDisabled(): boolean {
        return !this.categoryGroup.categoryGroupName || !this.categoryGroup.priority;
    }

    deleteGroup() {
        this.shopService.deleteCategoryGroup(this.categoryGroup.id)
            .then(() => this.dialog.ok());
    }

    private initNewGroup() {
        this.categoryGroup = <ICategoryGroup>{};
    }
}
