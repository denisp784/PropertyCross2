import {SectionDialogComponent} from './sectionDialog/sectionDialog.component';
import {IDialogConfig} from '../dialogModule/IDialogConfig';
import {CategoryGroupDialogComponent} from './categoryGroupDialog/categoryGroupDialog.component';
import {CategoryDialogComponent} from './categoryDialog/categoryDialog.component';
import {PropertiesDialogComponent} from './propertiesDialog/propertiesDialog.component';
import {LoginDialogComponent} from './loginDialog/loginDialog.component';
import {ConfirmDeleteDialogComponent} from './confirmDeleteDialog/confirmDeleteDialog.component';

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
    },

    propertiesDialogConfig: <IDialogConfig> {
        title: 'Изменение свойства',
        component: PropertiesDialogComponent
    },

    loginDialogConfig: <IDialogConfig> {
        title: 'Авторизация',
        component: LoginDialogComponent
    },

    confirmDeleteDialogConfig: <IDialogConfig> {
        title: 'Подтвердите удаление',
        component: ConfirmDeleteDialogComponent
    }
};
