import {Component, OnInit, trigger, state, style, transition, animate} from "@angular/core";
import {ShopService} from "../ShopService";
import {ICategoryGroup} from "../models/ICategoryGroup";
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ICategory} from "../models/ICategory";
import {SimpleModel} from "../models/SimpleModel";
import {AppService} from "../../app.service";
import {StorageService} from "../StorageService";
import {DialogService} from "../dialogModule/dialogService";
import {dialogConfigs} from "../dialogs/dialogs.config";

const noImageIcon = require("../resource/images/noImageIcon.png");

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
    selector: 'categoryGroup',
    templateUrl: 'categoryGroup.template.html',
    styleUrls: ['categoryGroup.less']
})
export class CategoryGroupComponent implements OnInit {

    categoryGroups: ICategoryGroup[];
    category: ICategory = <ICategory>{};
    sectionId: number;
    previewImg: any;
    file: any;
    private subscription: Subscription;
    private data: any;


    constructor(private appService: AppService,
                private shopService: ShopService,
                private storageService: StorageService,
                private route: ActivatedRoute,
                private dialogService: DialogService,
                private parentRouter: Router) {

        this.subscription = this.route.params.subscribe(params => {
            this.sectionId = params['sectionId'];
        });


        this.storageService.onSetLastSection.subscribe(() => {
            this.loadCategories();
        });

        this.loadCategories();
    }

    ngOnInit() {

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    loadCategories() {
        /*    if (!this.sectionId) {
         this.parentRouter.navigateByUrl("");
         return;
         }*/

        if (this.storageService.cachedGroup[this.storageService.lastSection]) {
            this.categoryGroups = this.storageService.cachedGroup[this.storageService.lastSection];
            return;
        }
        this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
            .then((categoryGroups) => {
                this.categoryGroups = categoryGroups;
                this.storageService.cachedGroup[this.storageService.lastSection] = categoryGroups;
            });
    }

    getPicture() {
        return this.previewImg || noImageIcon;
    }

    isAddDisabled(): boolean {
        return !this.category.categoryName || !this.file;
    }

    onFileChange(event) {
        this.file = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e: FileReaderEvent) => {
                this.previewImg = e.target.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    upload(group: ICategoryGroup) {
        this.appService.uploadFile('images/upload', this.file)
            .then((imageData: SimpleModel) => {
                this.category.imageId = imageData.id;
                this.category.categoryGroup = group;
                return this.shopService.addCategory(this.category);
            })
            .then(() => this.shopService.getCategoryGroupBySection(this.sectionId))
            .then((categoryGroups: ICategoryGroup[]) => {
                this.categoryGroups = categoryGroups;
            });
    }

    showAddGroupDialog(event, id) {
        let addGroupDialog = dialogConfigs.addGroupDialog;

        let data = {
            isEdit: arguments.length === 2,
            id
        };

        addGroupDialog.data = data;

        addGroupDialog.title = arguments.length === 2 ? 'Изменение группы категорий' : 'Добавление группы категорий';

        this.dialogService.showDialog(addGroupDialog)
            .subscribe(() => {
                this.shopService.getCategoryGroupBySection(this.storageService.lastSection)
                    .then((categoryGroups: ICategoryGroup[]) => {
                            this.categoryGroups = categoryGroups;
                            this.storageService.cachedGroup[this.storageService.lastSection] = categoryGroups;
                        }
                    )
            });
        event.stopPropagation();
    }
}
