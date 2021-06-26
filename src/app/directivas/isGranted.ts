import { Directive, Input, ViewContainerRef, TemplateRef, OnDestroy } from '@angular/core';

@Directive({
    selector: '[isGranted]'
})
export class IsGrantedDirective implements OnDestroy {

    private hasView: any;

    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) { }

    @Input() set isGranted(permiso: string) {
        let permisos = JSON.parse(sessionStorage.getItem('permisos') || '');
        let data: any = null;
        if (permisos) {
            data = permisos.find((item: { NOMB_ACCION: string; }) => item.NOMB_ACCION == permiso);
        }
        if (data) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }

    ngOnDestroy(): void {
        sessionStorage.removeItem('permisos');
    }
}