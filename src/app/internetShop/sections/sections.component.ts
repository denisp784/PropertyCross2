import {Component, Input, ViewChild, OnInit} from "@angular/core";
import {AppService} from "../../app.service";
import {SimpleModel} from "../models/SimpleModel";
import {ShopService} from "../ShopService";
import {ISection} from "../models/ISection";
import {Router} from "@angular/router";
import {ModalComponent} from "ng2-bs3-modal/ng2-bs3-modal";


interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}
const close = require('../resource/images/closeDark.png');
const noImageIcon = require("../resource/images/noImageIcon.png");

@Component({
    selector: 'sections',
    templateUrl: 'sections.template.html',
    styleUrls: ['sections.less']
})
export class SectionsComponent implements OnInit {
    @Input() sections: ISection[];

    @ViewChild('myModal')
    modal: ModalComponent;

    file: any;
    section: ISection = <ISection>{};
    previewImg: any;
    closeIcon = close;

    constructor(private appService: AppService,
                private shopService: ShopService,
                private router: Router) {

    }

    ngOnInit() {
        this.initNewSection();
    }

    goToSection(id: number) {
        this.router.navigateByUrl(`/categoryGroup/${id}`);
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

    upload() {
        this.appService.uploadFile('images/upload', this.file)
            .then((imageData: SimpleModel) => {
                this.section.imageId = imageData.id;
                return this.shopService.addSection(this.section);
            })
            .then(() => this.shopService.getSections())
            .then((sections: ISection[]) => {
                    this.sections = sections;
                    this.modal.close();
                    this.initNewSection();
                }
            );
    }

    isAddDisabled(): boolean {
        return !this.section.sectionName || !this.file;
    }

    deleteSection(sectionId: number) {
        this.shopService.deleteSection(sectionId)
            .then((sections: ISection[]) => {
                this.sections = sections;
            })
    }

    private initNewSection() {
        this.file = null;
        this.previewImg = null;
        this.section = <ISection>{};
    }
}
