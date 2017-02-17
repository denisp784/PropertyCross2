import {AddSectionComponent} from "./AddSectionDialog/addSection.component";
import {IDialogConfig} from "../dialogModule/IDialogConfig";

export const dialogConfigs = {
    addSectionDialog: <IDialogConfig>{
        title: 'Добавление секции',
        component: AddSectionComponent,
        data: {}
    }
};
