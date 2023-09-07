import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dump',
    templateUrl: './dump.component.html',
    styleUrls: ['./dump.component.scss']
})
export class DumpComponent implements OnInit {

    // #81
    @Input() dumpFormGroup: FormGroup;
    listaCampos: string[] = [];

    constructor() { 
    }

    ngOnInit() {
        this.dumpFormGroup ? this.listarCampos() : null;
    }

    listarCampos() {
        Object.keys((this.dumpFormGroup.controls)).forEach(campo => {
            this.listaCampos.push(campo);
        });
    }

}
