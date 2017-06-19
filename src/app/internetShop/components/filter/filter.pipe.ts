import {Pipe} from '@angular/core';
import * as _ from 'lodash';
@Pipe({
    name: 'values'
})
export class ValuesPipe {
    transform(values: any): any[] {
/*        value.vals = _.map(value.vals, val => {
           return {value: val};
        });*/
        return _.map(values, (value: any) => {
            value.vals = _.map(value.vals, val => {
                return {value: val, label: val};
            });

            return value;
        });
    }
}