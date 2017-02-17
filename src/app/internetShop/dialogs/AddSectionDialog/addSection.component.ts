import {Component} from "@angular/core";
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
export class AddSectionComponent extends DialogAwareComponent {
    previewImg: any;
    section: ISection = <ISection>{};
    file: any;
    
    constructor(private appService: AppService,
                private shopService: ShopService,
                private router: Router) {
        super();
        this.initNewSection();
    }
    
    getPicture() {
        return this.previewImg || noImageIcon;
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
        this.appService.uploadFile('images/upload', this.file)
            .then((imageData: SimpleModel) => {
                this.section.imageId = imageData.id;
                return this.shopService.addSection(this.section);
            })
            .then(() => this.dialog.ok());
    }
    
    isAddDisabled(): boolean {
        return !this.section.sectionName || !this.file;
    }
    
    private initNewSection() {
        this.file = null;
        this.previewImg = null;
        this.section = <ISection>{};
    }
}
