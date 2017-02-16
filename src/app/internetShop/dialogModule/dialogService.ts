import {Injectable, ViewContainerRef, ComponentFactoryResolver, Compiler} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {AddSectionComponent} from "../dialogs/AddSectionDialog/addSection.component";
import {DialogsModule} from "../dialogs/Dialogs.module";

@Injectable()
export class DialogService {
    private container: ViewContainerRef;
    
    constructor(private componentResolver: ComponentFactoryResolver,
                private compiler: Compiler) {
    }
    
    setContainer(container: ViewContainerRef) {
        this.container = container;
    }
    
    resetContainer() {
        this.container = null;
    }
    
    showDialog() {
        const factory = this.componentResolver.resolveComponentFactory(DialogComponent);
        const dialogComponentRef = this.container.createComponent(factory);
        const dialogComponent = dialogComponentRef.instance;
        this.createNewComponent()
            .then((component) => {
                dialogComponent.setComponent(component);
                dialogComponent.modal.open();
            })
    }
    
    private createNewComponent(): Promise<any> {
        const component = AddSectionComponent;
        const module = DialogsModule;
        return this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
                return factory.componentFactories.find(x => x.componentType === component);
            });
    }
}
/*
 import {Injectable, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, Compiler} from "@angular/core";
 import * as _ from 'lodash';
 import {AppModule} from "../../app.module";
 
 class DialogComponent {
 }
 
 @Injectable()
 export class DialogService {
 private container: ViewContainerRef;
 
 constructor(private componentResolver: ComponentFactoryResolver,
 private compiler: Compiler) {
 }
 
 setContainer(container: ViewContainerRef) {
 if (this.container) {
 throw Error('Контейнер для диалогов уже установлен');
 }
 
 this.container = container;
 }
 
 resetContainer() {
 this.container = null;
 }
 
 showDialog() {
 const factory = this.componentResolver.resolveComponentFactory(DialogComponent);
 }
 
 closeDialog() {
 }
 
 private createDialogComponent(factory: ComponentFactory<DialogComponent>,
 data?: Object) {
 if (!this.container) {
 throw Error('Контейнер для диалогов не установлен');
 }
 
 const dialogComponentRef = this.container.createComponent(factory);
 const dialogComponent = dialogComponentRef.instance;
 // const moduleForCompile = this.getModuleForCompile(config);
 const componentData = _.cloneDeep(data) || {};
 
 /!*dialogComponent.setObserver(observer);
 dialogComponent.setComponentData(componentData);
 dialogComponent.dialogConfig = config;*!/
 
 this.createNewComponent(AppModule)
 .then(component => {
 dialogComponent.setComponent(component);
 });
 
 /!*this.ngZone.run(() => {
 const TIMEOUT = setTimeout(() => {
 dialogComponent.showContent();
 dialogComponent.id = dialogId++;
 clearTimeout(TIMEOUT);
 }, SHOW_DIALOG_TIMEOUT);
 });*!/
 
 const subscribeDialogClose = dialogComponentRef.instance.closed.subscribe(() => {
 dialogComponentRef.destroy();
 subscribeDialogClose.unsubscribe();
 });
 
 this.dialogModule.push(dialogComponent);
 }
 
 /!*private getModuleForCompile(config: IModalConfig): Object {
 if (config.template && _.isString(config.template)) {
 return getEmptyHtmlComponent(config);
 }
 
 return config.component;
 }*!/
 
 private createNewComponent(module: any): Promise<any> {
 return this.compiler.compileModuleAndAllComponentsAsync(module.module).then(factory => {
 return factory.componentFactories.find(x => x.componentType === module.component);
 });
 }
 }
 */
