import {NgModule} from "@angular/core";
import {AddSectionComponent} from "./AddSectionDialog/addSection.component";
import {BrowserModule} from "@angular/platform-browser";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";

@NgModule({
    imports: [
        BrowserModule,
        Ng2Bs3ModalModule
    ],
    declarations: [
        AddSectionComponent
    ]
})
export class DialogsModule {}
