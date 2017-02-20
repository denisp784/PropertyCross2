import {Component, OnInit, trigger, state, transition, style, animate} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {ISection} from "../../models/ISection";
import {SimpleModel} from "../../models/SimpleModel";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";
import {Router} from "@angular/router";

const noImageIcon = require("../../resource/images/noImageIcon.png");

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
    selector: 'addSection',
    templateUrl: 'addSection.template.html',
    styleUrls: ['addSection.less']
})
export class AddSectionComponent extends DialogAwareComponent implements OnInit{
    previewImg: any;
    section: ISection = <ISection>{};
    file: any;
    imageUrl: string;
    
    constructor(private appService: AppService,
                private shopService: ShopService,
                private router: Router) {
        super();
        this.initNewSection();
    }

    ngOnInit() {
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
            var reader = new FileReader();
            
            reader.onload = (e: FileReaderEvent) => {
                this.previewImg = e.target.result;
            };
            
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    
    goToSection(id: number) {
        this.router.navigateByUrl(`/categoryGroup/${id}`);
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
        return !this.section.sectionName;
    }
    
    private initNewSection() {
        this.file = null;
        this.previewImg = null;
        this.section = <ISection>{};
    }
}
