import {Component, ElementRef, ViewChild, OnInit, AfterViewInit, Inject} from "@angular/core";
import {ShopService} from "../../ShopService";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {StorageService} from "../../StorageService";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";

const noImageIcon = require("../../resource/images/noImageIcon.png");

@Component({
    selector: 'categoryGroup',
    templateUrl: 'categoryGroup.template.html',
    styleUrls: ['categoryGroup.less']
})

export class CategoryGroupComponent {
    categoryGroups: ICategoryGroup[];
    sectionId: number;
    previewImg: any;
    showCategories: boolean;
    categoryGroupId: number;
    private subscription: Subscription;

    constructor(private shopService: ShopService,
                private storageService: StorageService,
                private route: ActivatedRoute,
                private dialogService: DialogService) {

        this.subscription = this.route.params.subscribe(params => {
            this.sectionId = params['sectionId'];
        });

        this.storageService.onSetLastSection.subscribe(() => {
            this.loadCategories();
        });

        this.loadCategories();
    }

    loadCategories() {
        if (this.storageService.cachedGroups[this.storageService.lastSection]) {
            this.categoryGroups = this.storageService.cachedGroups[this.storageService.lastSection];
            return;
        }
        this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
            .then((categoryGroups) => {
                this.categoryGroups = categoryGroups;
                this.storageService.cachedGroups[this.storageService.lastSection] = categoryGroups;

            });
    }

    getPicture() {
        return this.previewImg || noImageIcon;
    }

    showCategoryGroupDialog(event, id) {
        const categoryGroupDialog = dialogConfigs.categoryGroupDialogConfig;

        categoryGroupDialog.data = {
            isEditFlag: arguments.length === 2,
            id
        };

        categoryGroupDialog.title = arguments.length === 2 ? 'Изменение группы категорий' : 'Добавление группы категорий';

        this.dialogService.showDialog(categoryGroupDialog)
            .subscribe((data) => {
                console.log(data);
                this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
                    .then((categoryGroups: ICategoryGroup[]) => {
                            this.categoryGroups = categoryGroups;
                            this.storageService.cachedGroups[this.storageService.lastSection] = categoryGroups;
                        }
                    )
            });
        event.stopPropagation();
    }

    isShowCategories(id: number) {
        this.categoryGroupId = id;
        this.showCategories = !this.showCategories;
    }
}
