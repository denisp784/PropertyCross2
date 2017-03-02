import {Component, Input, OnInit} from "@angular/core";
import {ShopService} from "../../ShopService";
import {DialogService} from "../../dialogModule/dialogService";
import {dialogConfigs} from "../../dialogs/dialogs.config";
import {StorageService} from "../../StorageService";
import {ICategoryGroup} from "../../models/ICategoryGroup";
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {AuthService} from "../../AuthService";

@Component({
    selector: 'category',
    templateUrl: 'category.template.html',
    styleUrls: ['category.less']
})
export class CategoriesComponent implements OnInit {
    @Input() categoryGroup: ICategoryGroup;
    isAdmin: boolean;

    constructor(private shopService: ShopService,
                private dialogService: DialogService,
                private storageService: StorageService,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.isAdmin = this.authService.isManager();
    }

    showCategoryDialog(event, id) {
        this.storageService.lastGroupId = this.categoryGroup.id;
        const categoryDialog = dialogConfigs.categoryDialogConfig;

        categoryDialog.data = {
            isEditFlag: arguments.length === 2,
            id
        };

        categoryDialog.title = arguments.length === 2 ? 'Изменение категории' : 'Добавление категории';

        this.dialogService.showDialog(categoryDialog)
            .subscribe(() => {
                this.shopService.getCategoryGroupById(this.categoryGroup.id)
                    .then((categoryGroup: ICategoryGroup) => {
                            this.categoryGroup = categoryGroup;
                            const groupIndex = _.findIndex(this.storageService.cachedGroups[this.storageService.lastSection], {id: this.categoryGroup.id});
                            this.storageService.cachedGroups[this.storageService.lastSection][groupIndex] = categoryGroup;
                        }
                    );
            });
        event.stopPropagation();
    }

    onSelect(url: string) {
        this.router.navigate([url])
    }
}
