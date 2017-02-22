import {Component, OnInit, trigger, state, transition, style, animate} from "@angular/core";
import {ICategory} from "../../models/ICategory";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";
import {StorageService} from "../../StorageService";
import {Router} from "@angular/router";
import {IAddCategory} from "../../models/IAddCategory";
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
    selector: 'addCategory',
    templateUrl: 'addCategory.template.html',
    styleUrls: ['addCategory.less']
})

export class AddCategoryComponent extends DialogAwareComponent implements OnInit {

    category: ICategory;
    categoryGroups: ICategoryGroup[];
    addCategory: IAddCategory;
    previewImg: any;
    file: any;
    imageUrl: string;

    constructor(private appService: AppService,
                private shopService: ShopService,
                private storageService: StorageService,
                private router: Router) {
        super();
        this.initNewCategory();
    }

    ngOnInit() {
        this.addCategory.priority = 1;
        if (this.currentData.id) {
            this.shopService.getCategoryById(this.currentData.id)
                .then((addCategory: IAddCategory) => {
                        this.addCategory = addCategory;
                    }
                )
        }
    }

    initNewCategory() {
        this.file = null;
        this.previewImg = null;
        this.addCategory = <IAddCategory>{};
    }

/*    upload() {
        console.log(this.addCategory);
        this.addCategory.categoryGroup = {id: 5};
        this.addCategory.imageId = 1;
        this.addCategory.priority = 1;
        this.addCategory.urlName = 'test';
        this.shopService.addCategory(this.addCategory)
            .then(() => this.dialog.ok());
    }*/

    getPicture() {
        return this.previewImg || this.imageUrl || noImageIcon;
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

    deleteCategory() {
        this.shopService.deleteCategory(this.addCategory.id)
            .then(() => this.dialog.ok());
    }

    upload() {
        this.addCategory.categoryGroupId = this.storageService.lastGroup;

        if (this.file) {
            this.appService.uploadFile('images/upload', this.file)
                .then((imageData: SimpleModel) => {
                    this.addCategory.imageId = imageData.id;
                    return this.shopService.addCategory(this.addCategory);
                })
                .then(() => this.dialog.ok());
        } else {
            this.shopService.addCategory(this.addCategory)
                .then(() => this.dialog.ok());
        }
    }
}
