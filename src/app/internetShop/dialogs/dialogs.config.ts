import {AddSectionComponent} from "./AddSectionDialog/addSection.component";
import {IDialogConfig} from "../dialogModule/IDialogConfig";
import {AddGroupComponent} from "./AddGroupDialog/addGroup.component";

export const dialogConfigs = {
    addSectionDialog: <IDialogConfig>{
        title: 'Добавление секции',
        component: AddSectionComponent
    },

    addGroupDialog: <IDialogConfig> {
        title: 'Добавление группы категорий',
        component: AddGroupComponent
    }
};