import {Component, OnInit} from "@angular/core";
import {ICategory} from "../../models/ICategory";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService";
import {SimpleModel} from "../../models/SimpleModel";
import {ICategoryGroup} from "../../models/ICategoryGroup";

const noImageIcon = require("../../resource/images/noImageIcon.png");

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
    selector: 'categoryDialog',
    templateUrl: 'categoryDialog.template.html',
    styleUrls: ['categoryDialog.less']
})

export class CategoryDialogComponent extends DialogAwareComponent implements OnInit {
    categoryGroups: ICategoryGroup[];
    category: ICategory;
    previewImg: any;
    file: any;
    imageUrl: string;

    constructor(private appService: AppService,
                private shopService: ShopService,
                private storageService: StorageService) {
        super();
        this.initNewCategory();
    }

    private initNewCategory() {
        this.file = null;
        this.previewImg = null;
        this.category = <ICategory>{};
    }

    ngOnInit() {
        this.category.priority = 1;
        if (this.currentData.id) {
            this.shopService.getCategoryById(this.currentData.id)
                .then((category: ICategory) => {
                        this.category = category;
                        this.imageUrl = 'http://localhost:8080/images/get/' + this.category.imageId;
                    }
                )
        }
    }

    getPicture() {
        return this.previewImg || this.imageUrl || noImageIcon;
    }

    onFileChange(event) {
        this.file = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e: FileReaderEvent) => {
                this.previewImg = e.target.result;
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }

    deleteCategory() {
        this.shopService.deleteCategory(this.category.id)
            .then(() => this.dialog.ok());
    }

    upload() {
        this.category.categoryGroupId = this.storageService.lastGroupId;

        if (this.file) {
            this.appService.uploadFile('images/upload', this.file)
                .then((imageData: SimpleModel) => {
                    this.category.imageId = imageData.id;
                    return this.shopService.addCategory(this.category);
                })
                .then(() => this.dialog.ok());
        } else {
            this.shopService.addCategory(this.category)
                .then(() => this.dialog.ok());
        }
    }

    isAddDisabled(): boolean {
        if (this.currentData.isEditFlag) {
            return !this.category.categoryName || !this.category.urlName || !this.category.priority;
        } else return !this.category.categoryName || !this.file || !this.category.urlName || !this.category.priority;

    }
}