import {NgModule} from "@angular/core";
import {AddSectionComponent} from "./AddSectionDialog/addSection.component";
import {BrowserModule} from "@angular/platform-browser";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {FormsModule} from "@angular/forms";
import {AddGroupComponent} from "./AddGroupDialog/addGroup.component";
import {AddCategoryComponent} from "./addCategoryDialog/addCategory.component";

@NgModule({
    imports: [
        FormsModule,
        BrowserModule,
        Ng2Bs3ModalModule
    ],
    declarations: [
        AddSectionComponent,
        AddGroupComponent,
        AddCategoryComponent
    ]
})
export class DialogsModule {}
