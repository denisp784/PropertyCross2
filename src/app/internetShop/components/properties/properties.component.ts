import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {DialogService} from '../../dialogModule/dialogService';
import {ShopService} from '../../ShopService';
import {IProperty} from '../../models/IProperty';
import {IPropertyInCategory} from '../../models/IPropertyInCategory';
import {ICategory} from '../../models/ICategory';

const PROPERTIES_TYPES = [
    'Checkbox',
    'Input'
];

@Component( {
    selector: 'properties',
    templateUrl: 'properties.template.html',
    styleUrls: ['properties.less']
})

export class PropertiesComponent implements OnInit {
    constructor(private dialogService: DialogService,
                private shopService: ShopService) {
    }

    propertiesTypes = PROPERTIES_TYPES;

    @Input() category: ICategory;
    @Output() closePropertiesEmit = new EventEmitter;
    property: IProperty = <IProperty>{};
    properties: IProperty[];
    propertyInCategory: IPropertyInCategory = <IPropertyInCategory>{};

    ngOnInit() {
        this.getProperties();
        this.property.priority = 1;
    }

    getProperties(): void {
        this.shopService.getPropertiesByCategory(this.category.id)
            .subscribe((properties: IProperty[]) => {
                this.properties = properties;
            });
    }

    closeProperties(): void {
        this.closePropertiesEmit.emit();
    }

    showPropertiesDialog(propertyId: number) {
        const propertiesDialog = dialogConfigs.propertiesDialogConfig;

        propertiesDialog.data = {
            propertyId
        };

        this.dialogService.showDialog(propertiesDialog)
            .subscribe(() => {
                this.getProperties();
            });
    }

    upload() {
        this.property.priority = 1;
        this.shopService.addProperty(this.property)
            .subscribe((data) => {
                this.propertyInCategory.category = {id: this.category.id};
                this.propertyInCategory.property = {id: data.id};

                this.shopService.addPropertyInCategory(this.propertyInCategory)
                    .subscribe(() => {
                        this.getProperties();
                        this.property = <IProperty>{};
                    });
            });
    }

    delete(propertyId: number) {
        this.shopService.deleteProperty(propertyId)
            .subscribe(() => this.getProperties());
    }
}