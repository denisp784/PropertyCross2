import {Component, OnInit} from "@angular/core";
import {DialogAwareComponent} from "../../dialogModule/dialogAware.component";
import {AppService} from "../../../app.service";
import {ShopService} from "../../ShopService";
import {IPropertyInCategory} from "../../models/IPropertyInCategory";
import {IProperty} from "../../models/IProperty";

@Component({
    selector: "propertiesDialog",
    templateUrl: "propertiesDialog.template.html",
    styleUrls: ['propertiesDialog.less']
})

export class PropertiesDialogComponent extends DialogAwareComponent implements OnInit {
    constructor(private appService: AppService,
                private shopService: ShopService) {
        super();
    }

    property: IProperty = <IProperty>{};
    propertyInCategory: IPropertyInCategory = <IPropertyInCategory>{};

    ngOnInit() {

    }

    upload() {
        this.shopService.addProperty(this.property)
            .then((data) => {
                this.propertyInCategory.category = {id: this.currentData.id};
                this.propertyInCategory.property = {id: data.id};

                this.shopService.addPropertyInCategory(this.propertyInCategory)
                    .then(() => {
                        console.log('свойство добавлено в категорию');
                    })
            });
    }
}
