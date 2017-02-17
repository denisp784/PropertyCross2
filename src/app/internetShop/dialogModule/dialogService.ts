import {Injectable, ViewContainerRef, ComponentFactoryResolver, Compiler, EventEmitter} from "@angular/core";
import {DialogComponent} from "./dialog.component";
import {DialogsModule} from "../dialogs/Dialogs.module";
import {IDialogConfig} from "./IDialogConfig";

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
    
    showDialog(config: IDialogConfig) {
        const factory = this.componentResolver.resolveComponentFactory(DialogComponent);
        const dialogComponentRef = this.container.createComponent(factory, 0);
        const dialogComponent = dialogComponentRef.instance;
        const emitter = new EventEmitter();
        
        this.createNewComponent(config.component)
            .then((component) => {
                dialogComponent.setComponent(component, config, emitter);
            });
        
        emitter
            .subscribe(
                () => this.removeModal(),
                () => this.removeModal()
            );
        
        return emitter;
    }
    
    private removeModal() {
        this.container.clear();
    }
    
    private createNewComponent(component: any): Promise<any> {
        const module = DialogsModule;
        
        return this.compiler.compileModuleAndAllComponentsAsync(module)
            .then(factory => {
                return factory.componentFactories.find(x => x.componentType === component);
            });
    }
}

