import {DialogComponent} from './dialog.component';

export interface IDialogAwareComponent {
    dialog: DialogComponent;
    setDialog(dialog: DialogComponent): void;
    getDialog(): DialogComponent;
}

export class DialogAwareComponent implements IDialogAwareComponent {

    dialog: DialogComponent;
    currentData: any;

    setDialog(dialog: DialogComponent) {
        this.dialog = dialog;
        this.currentData = this.dialog.config.data;
    }

    getDialog(): DialogComponent {
        return this.dialog;
    }
}
