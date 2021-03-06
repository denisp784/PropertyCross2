import {NgModule} from '@angular/core';
import {SectionDialogComponent} from './sectionDialog/sectionDialog.component';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import {FormsModule} from '@angular/forms';
import {CategoryGroupDialogComponent} from './categoryGroupDialog/categoryGroupDialog.component';
import {CategoryDialogComponent} from './categoryDialog/categoryDialog.component';
import {PropertiesDialogComponent} from './propertiesDialog/propertiesDialog.component';
import {LoginDialogComponent} from './loginDialog/loginDialog.component';
import {ConfirmDeleteDialogComponent} from './confirmDeleteDialog/confirmDeleteDialog.component';
import {DialogService} from '../dialogModule/dialogService';
import {DialogComponent} from '../dialogModule/dialog.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        Ng2Bs3ModalModule
    ],
    declarations: [
        SectionDialogComponent,
        CategoryGroupDialogComponent,
        CategoryDialogComponent,
        PropertiesDialogComponent,
        LoginDialogComponent,
        ConfirmDeleteDialogComponent
    ]
})
export class DialogsModule {
}
