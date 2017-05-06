import {Component, OnInit} from '@angular/core';
import {DialogAwareComponent} from '../../dialogModule/dialogAware.component';
import {ShopService} from '../../ShopService';
import {IProperty} from '../../models/IProperty';

@Component({
    selector: 'properties-dialog',
    templateUrl: 'propertiesDialog.template.html',
    styleUrls: ['propertiesDialog.less']
})

export class PropertiesDialogComponent extends DialogAwareComponent implements OnInit {
    constructor(private shopService: ShopService) {
        super();
    }

    property: IProperty = <IProperty>{};

    ngOnInit() {
        this.shopService.getPropertyById(this.currentData.propertyId)
            .subscribe((property) => this.property = property);
    }

    upload() {
        this.shopService.updateProperty(this.property)
            .subscribe(() => {
                this.dialog.ok();
            });
    }
}
