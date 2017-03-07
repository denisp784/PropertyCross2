import {NgModule} from "@angular/core";
import {DialogHost} from "./dialogHost.component";
import {DialogService} from "./dialogService";
import {DialogComponent} from "./dialog.component";
import {BrowserModule} from "@angular/platform-browser";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        BrowserModule,
        Ng2Bs3ModalModule,
        FormsModule
    ],
    declarations: [
        DialogHost,
        DialogComponent
    ],
    providers: [
        DialogService
    ],
    exports: [
        DialogHost,
        DialogComponent
    ],
    entryComponents: [DialogComponent]
})
export class DialogConfigModule {
}
