import {Component, ViewContainerRef, ViewChild, AfterViewInit, ComponentFactory} from "@angular/core";
import {IDialogAwareComponent} from "./dialogAware.component";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
    selector: 'ng2-dialog',
    templateUrl: 'dialog.template.html'
})
export class DialogComponent implements AfterViewInit{
    @ViewChild('body', { read: ViewContainerRef }) body: ViewContainerRef;
    @ViewChild('myModal') modal: ModalComponent;
    
    ngAfterViewInit() {
        console.log(this.body);
    }
    
    setComponent(component: ComponentFactory<IDialogAwareComponent>) {
        const createdComponent = this.body.createComponent(component, 0);
        createdComponent.instance.setDialog(this);
    }
}
