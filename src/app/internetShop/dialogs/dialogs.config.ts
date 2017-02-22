import {AddSectionComponent} from "./AddSectionDialog/addSection.component";
import {IDialogConfig} from "../dialogModule/IDialogConfig";
import {AddGroupComponent} from "./AddGroupDialog/addGroup.component";
import {AddCategoryComponent} from "./addCategoryDialog/addCategory.component";

export const dialogConfigs = {
    addSectionDialog: <IDialogConfig>{
        title: 'Добавление секции',
        component: AddSectionComponent
    },

    addGroupDialog: <IDialogConfig> {
        title: 'Добавление группы категорий',
        component: AddGroupComponent
    },

    addCategoryDialog: <IDialogConfig> {
        title: 'Добавление категории',
        component: AddCategoryComponent
    }
};
