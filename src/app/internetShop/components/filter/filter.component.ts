import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'filter',
    templateUrl: 'filter.template.html',
    styleUrls: ['filter.less']
})

export class FilterComponent implements AfterViewInit {

    ngAfterViewInit() {
        console.log('a');
    }

}