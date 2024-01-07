// dynamic-modal.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appDynamicModal]'
})
export class DynamicModalDirective {
    public viewContainerRef: ViewContainerRef;

    @Input() set appDynamicModal(contentTemplate: TemplateRef<any> | null) {
        if (contentTemplate) {
            this.viewContainerRef.createEmbeddedView(contentTemplate);
        }
    }

    constructor(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
