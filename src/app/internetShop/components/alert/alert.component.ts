import {animate, Component, OnInit, style, transition, trigger} from '@angular/core';
import {StorageService} from '../../StorageService';
@Component({
    selector: 'alert',
    templateUrl: 'alert.template.html',
    styleUrls: ['alert.less']
})

export class AlertComponent  {
    constructor(private storageService: StorageService) {
        this.storageService.onShowAlert
            .subscribe(() => {
                console.log('subscribe');
            });
    }
}