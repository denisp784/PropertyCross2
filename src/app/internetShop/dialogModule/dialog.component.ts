import {
    Component, ViewContainerRef, ViewChild, ComponentFactory, OnInit,
    EventEmitter
} from '@angular/core';
import {IDialogAwareComponent} from './dialogAware.component';
import {ModalComponent} from 'ng2-bs3-modal/components/modal';
import {IDialogConfig} from './IDialogConfig';

@Component({
    selector: 'ng2-dialog',
    templateUrl: 'dialog.template.html'
})
export class DialogComponent implements OnInit {
    @ViewChild('body', {read: ViewContainerRef}) body: ViewContainerRef;
    @ViewChild('myModal') modal: ModalComponent;
    component: ComponentFactory<IDialogAwareComponent>;
    config: IDialogConfig;
    emitter: EventEmitter<any>;
    data: Object = {};

    ngOnInit() {
        this.modal.onDismiss.subscribe(() => {
            this.onCancel();
        });
    }

    setComponent(component: ComponentFactory<IDialogAwareComponent>,
                 config: IDialogConfig,
                 emitter: EventEmitter<any>) {
        const createdComponent = this.body.createComponent(component, 0);

        this.emitter = emitter;
        this.config = config;

        createdComponent.instance.setDialog(this);

        setTimeout(() => {
            this.modal.open();
        }, 4);
    }

    cancel() {
        this.modal.close();
        this.onCancel();
    }

    ok() {
        this.modal.close();
        this.emitter.emit(this.data);
    }

    onCancel() {
        this.emitter.error('cancel');
    }
}
