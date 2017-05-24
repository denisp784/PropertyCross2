import {Component} from '@angular/core';
import {DialogAwareComponent} from '../../dialogModule/dialogAware.component';

@Component({
    selector: 'confirmDeleteDialog',
    templateUrl: 'confirmDeleteDialog.template.html',
    styleUrls: ['confirmDeleteDialog.less']
})

export class ConfirmDeleteDialogComponent extends DialogAwareComponent {}