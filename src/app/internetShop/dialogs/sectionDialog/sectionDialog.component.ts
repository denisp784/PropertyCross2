import {Component, OnInit} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {ISection} from "../../models/ISection";
import {SimpleModel} from "../../models/SimpleModel";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";

const noImageIcon = require("../../resource/images/noImageIcon.png");

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
    selector: 'sectionDialog',
    templateUrl: 'sectionDialog.template.html',
    styleUrls: ['sectionDialog.less']
})
export class SectionDialogComponent extends DialogAwareComponent implements OnInit {
    previewImg: any;
    section: ISection = <ISection>{};
    file: any;
    imageUrl: string;

    constructor(private appService: AppService,
                private shopService: ShopService) {
        super();
        this.initNewSection();
    }

    private initNewSection() {
        this.file = null;
        this.previewImg = null;
        this.section = <ISection>{};
    }

    ngOnInit() {
        this.section.priority = 1;
        if (this.currentData.sectionId) {
            this.shopService.getSectionById(this.currentData.sectionId)
                .then((section: ISection) => {
                    this.section = section;
                    this.imageUrl = 'http://localhost:8080/images/get/' + this.section.imageId;
                });
        }
    }

    deleteSection() {
        this.shopService.deleteSection(this.currentData.sectionId)
            .then(() => this.dialog.ok());
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

    upload() {
        if (this.file) {
            this.appService.uploadFile('images/upload', this.file)
                .then((imageData: SimpleModel) => {
                    this.section.imageId = imageData.id;
                    return this.shopService.addSection(this.section);
                })
                .then(() => this.dialog.ok());
        } else {
            this.shopService.addSection(this.section)
                .then(() => this.dialog.ok());
        }
    }

    isAddDisabled(): boolean {
        return !this.section.sectionName || !this.section.priority;
    }
}
