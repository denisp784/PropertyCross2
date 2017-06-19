import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {IPropertyWithValues} from '../../models/IPropertyWithValues';
import * as _ from 'lodash';

@Component({
    selector: 'filter',
    templateUrl: 'filter.template.html',
    styleUrls: ['filter.less']
})

export class FilterComponent  {
    @Input() propertiesWithValues: IPropertyWithValues;
    @Output() onFilter: EventEmitter<any> = new EventEmitter();
    valueObj = {};

    applyFilter(event, id: number) {
        const values = _(event.options)
            .map((option: any) => {
                if (option.selected) {
                    return option.wrappedOption.value;
                }
            })
            .filter(option => !!option).value();

        this.valueObj[id] = values;
        this.onFilter.emit(this.valueObj);
    }
}