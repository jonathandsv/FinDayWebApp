import { Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Directive({
    selector: '[permissao]'
})
export class PermissaoDirective {

    private permissoes: string;

    constructor(private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userService: UserService,
        private router: Router,
        public activatedRoute: ActivatedRoute) {
    }

    @Input()
    set permissao(val: string) {
        this.permissoes = val;
        this.updateView();
    }

    private updateView() {
        const funcionalidade = this.activatedRoute.routeConfig.data.funcionalidade;
        if (this.permissoes) {
            if (this.userService.verificarPermissaoAcao(funcionalidade, this.permissoes)) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        }
    }
}
