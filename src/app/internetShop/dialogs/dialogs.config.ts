import {SectionDialogComponent} from "./sectionDialog/sectionDialog.component";
import {IDialogConfig} from "../dialogModule/IDialogConfig";
import {CategoryGroupDialogComponent} from "./categoryGroupDialog/categoryGroupDialog.component";
import {CategoryDialogComponent} from "./categoryDialog/categoryDialog.component";

export const dialogConfigs = {
    sectionDialogConfig: <IDialogConfig>{
        title: 'Добавление секции',
        component: SectionDialogComponent
    },

    categoryGroupDialogConfig: <IDialogConfig> {
        title: 'Добавление группы категорий',
        component: CategoryGroupDialogComponent
    },

    categoryDialogConfig: <IDialogConfig> {
        title: 'Добавление категории',
        component: CategoryDialogComponent
    }
};
