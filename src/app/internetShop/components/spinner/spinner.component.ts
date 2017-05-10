import {Component, Input} from '@angular/core';

@Component({
    selector: 'spinner',
    styleUrls: ['spinner.less'],
    templateUrl: 'spinner.template.html'
})

export class SpinnerComponent {
    @Input() isSpinnerVisible;
    @Input() isImgSpinnerVisible;
}
