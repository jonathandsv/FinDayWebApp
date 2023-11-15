import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dump',
    standalone: true,
    templateUrl: './dump.component.html',
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        JsonPipe
      ],
    styleUrls: ['./dump.component.scss']
})
export class DumpComponent implements OnInit {

    // #81
    @Input() dumpFormGroup!: FormGroup;
    listaCampos: string[] = [];

    constructor() { }

    ngOnInit() {
        this.dumpFormGroup ? this.listarCampos() : null;
    }

    listarCampos() {
        Object.keys((this.dumpFormGroup.controls)).forEach(campo => {
            this.listaCampos.push(campo);
        });
    }

}
