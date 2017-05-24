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
    isSpinnerVisible = false;

    ngOnInit() {
        this.isSpinnerVisible = true;
        this.getProperties();
        this.property.priority = 1;
    }

    getProperties(): void {
        this.shopService.getPropertiesByCategory(this.category.id)
            .subscribe((properties: IProperty[]) => {
                this.properties = properties;
                setTimeout(() => this.isSpinnerVisible = false, 500);
            });
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

    deleteProperty(propertyId: number) {
        const confirmDeleteDialog = dialogConfigs.confirmDeleteDialogConfig;

        this.dialogService.showDialog(confirmDeleteDialog)
            .flatMap(() => {
                return this.shopService.deleteProperty(propertyId);
            })
            .subscribe(() => {
                this.getProperties();
            }, () => {});
    }
}