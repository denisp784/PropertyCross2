import {Component, Input, EventEmitter, Output, OnInit} from '@angular/core';
import {dialogConfigs} from '../../dialogs/dialogs.config';
import {DialogService} from '../../dialogModule/dialogService';
import {ShopService} from '../../ShopService';
import {IProperty} from '../../models/IProperty';
import {IPropertyInCategory} from '../../models/IPropertyInCategory';
import {ICategory} from '../../models/ICategory';

const testProperties = [
    'Цена',
    'Производитель',
    'Дата выхода',
    'Тип',
    'Диагональ',
    'Разрешение',
    'Матрица',
    'Процессор',
    'Тактовая частота',
    'Оперативная память',
    'Тип диска',
    'Ёмкость диска',
    'Тип видеокарты',
    'Количество ядер',
    'Тип оперативной памяти',
    'Видеопамять'
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

    @Input() category: ICategory;
    @Output() close = new EventEmitter<boolean>();

    testProperties = testProperties;
    property: IProperty = <IProperty>{};
    properties: IProperty[];
    propertyInCategory: IPropertyInCategory = <IPropertyInCategory>{};

    ngOnInit() {
        this.getProperties();
    }

    getProperties(): void {
        this.shopService.getPropertiesByCategory(this.category.id)
            .subscribe((properties: IProperty[]) => {
                this.properties = properties;
            });
    }

    closeProperties(): void {
        this.close.emit();
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