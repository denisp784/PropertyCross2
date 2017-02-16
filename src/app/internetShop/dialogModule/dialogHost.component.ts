import {Component, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy, Inject} from '@angular/core';
import {DialogService} from "./dialogService";

@Component({
    selector: 'dialogHost',
    template: '<div #container></div>'
})
export class DialogHost implements AfterViewInit, OnDestroy {
    @ViewChild('container', {read: ViewContainerRef})
    private container: ViewContainerRef;

    constructor(private dialog: DialogService) {
    }

    ngAfterViewInit() {
        this.dialog.setContainer(this.container);
    }

    ngOnDestroy() {
        this.dialog.resetContainer();
    }
}
