import {Component, OnInit} from "@angular/core";
import {ShopService} from "../../ShopService";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {StorageService} from "../../StorageService";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {AuthService} from "../../AuthService";

const noImageIcon = require("../../resource/images/noImageIcon.png");

@Component({
    selector: 'categoryGroup',
    templateUrl: 'categoryGroup.template.html',
    styleUrls: ['categoryGroup.less']
})

export class CategoryGroupComponent implements OnInit{
    categoryGroups: ICategoryGroup[];
    categoryGroup: ICategoryGroup;
    sectionId: number;
    previewImg: any;
    activeGroupIndex: number;
    isAdmin: boolean;
    private subscription: Subscription;

    constructor(private shopService: ShopService,
                private storageService: StorageService,
                private route: ActivatedRoute,
                private dialogService: DialogService,
                private authService: AuthService) {

        this.subscription = this.route.params.subscribe(params => {
            this.sectionId = params['sectionId'];
        });

        this.storageService.onSetLastSection.subscribe(() => {
            this.loadCategoryGroups();
        });

        this.loadCategoryGroups();
    }

    ngOnInit() {
        this.isAdmin = this.authService.isManager();
    }

    loadCategoryGroups() {
        if (!this.storageService.lastSection) {
            return;
        }

        if (this.storageService.cachedGroups[this.storageService.lastSection]) {
            this.categoryGroups = this.storageService.cachedGroups[this.storageService.lastSection];
            this.categoryGroup = this.categoryGroups[0];
            return;
        }

        this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
            .subscribe((categoryGroups) => {
                this.categoryGroups = categoryGroups;
                this.storageService.cachedGroups[this.storageService.lastSection] = categoryGroups;

                this.categoryGroup = categoryGroups[0];
                this.activeGroupIndex = 0;
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
                this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
                    .subscribe((categoryGroups: ICategoryGroup[]) => {
                            this.categoryGroups = categoryGroups;
                            this.storageService.cachedGroups[this.storageService.lastSection] = categoryGroups;
                        }
                    )
            });
        event.stopPropagation();
    }

    isShowCategories(i: number) {
        this.activeGroupIndex = i;
        this.categoryGroup = this.categoryGroups[i];
    }
}
