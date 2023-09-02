import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Listbox } from 'primeng/listbox';

@Component({
    selector: 'listboxCommonComponent',
    templateUrl: './listbox-common.component.html',
    styleUrls: ['./listbox-common.component.scss'],
})
export class ListboxCommonComponent implements OnInit, AfterViewInit {
    @ViewChild('listbox1') listbox1: Listbox;
    @ViewChild('listbox2') listbox2: Listbox;
    @Input() listaDesvinculados = [];
    @Input() listaVinculados = [];
    @Input() tituloListaDesvinculado = '';
    @Input() tituloListaVinculada = '';
    @Input() nomeCampoLista = '';
    @Input() idCampoLista = '';
    @Input() isDisabled = false;

    selectedDesvinculados: any;
    selectedVinculados: any;

    @Output() listaAtualizada = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.listbox1 = this.listbox1;
        this.listbox2 = this.listbox2;
    }

    limparFiltroHeader() {
        if (this.listbox1){
            this.listbox1.filterValue = null;
            this.listbox1._filterValue = '';
        }
        if (this.listbox2){
            this.listbox2.filterValue = null;
            this.listbox2._filterValue = '';
        }
        this.listaDesvinculados = this.listaDesvinculados;
        this.listaVinculados =  this.listaVinculados;
    }
    moveUserToGroupMember() {
        let lis = [];
        this.selectedDesvinculados.forEach((x) =>
            lis.push(
                this.listaDesvinculados.find((y) => y[this.idCampoLista] == x[this.idCampoLista])
            )
        );
        this.listaVinculados = this.listaVinculados.concat(lis);
        this.listaVinculados = this.listaVinculados.filter(
            function (item) {
                return item !== undefined;
            }
        );
        for (let i = 0; i < lis.length; i++) {
            this.listaDesvinculados =
                this.listaDesvinculados.filter(function (obj: any) {
                    return obj !== lis[i];
                });
        }
        this.selectedDesvinculados = [];
        this.listaVinculados = this.listaVinculados.sort((a, b) =>
            a[this.idCampoLista] > b[this.idCampoLista] ? 1 : -1
        );
        this.ordenaListas();
        this.listaAtualizada.emit({ listaDesvinculados: this.listaDesvinculados, listaVinculados: this.listaVinculados });
    }
    ordenaListas() {
        if (this.listaDesvinculados) {
            const nome = this.nomeCampoLista;
            this.listaDesvinculados.sort(function (a, b) {
                if (a[nome].toUpperCase() > b[nome].toUpperCase()) {
                    return 1;
                }
                if (a[nome].toUpperCase() < b[nome].toUpperCase()) {
                    return -1;
                }
                return 0;
            });
        }
        if (this.listaVinculados) {
            const nome = this.nomeCampoLista;
            this.listaVinculados.sort(function (a, b) {
                if (a[nome].toUpperCase() > b[nome].toUpperCase()) {
                    return 1;
                }
                if (a[nome].toUpperCase() < b[nome].toUpperCase()) {
                    return -1;
                }
                return 0;
            });
        }
    }
    removerItem(lis) {
        lis = lis.filter(function (item) {
            return item !== undefined;
        });
        this.listaDesvinculados =
            this.listaDesvinculados.concat(lis);
        for (let i = 0; i < lis.length; i++) {
            this.listaVinculados = this.listaVinculados.filter(
                function (obj) {
                    return obj !== lis[i];
                }
            );
        }
        this.selectedVinculados = [];
        this.listaDesvinculados = this.listaDesvinculados.sort(
            (a, b) => (a[this.idCampoLista] > b[this.idCampoLista] ? 1 : -1)
        );
        this.ordenaListas();
        this.listaAtualizada.emit({ listaDesvinculados: this.listaDesvinculados, listaVinculados: this.listaVinculados });
    }
    moveGroupToUser() {
        if (!this.selectedVinculados) return;
        let lis = [];
        this.selectedVinculados.forEach((x) =>
            lis.push(
                this.listaVinculados.find((y) => y[this.idCampoLista] == x[this.idCampoLista])
            )
        );
        this.ordenaListas();
        this.removerItem(lis);
    }
}
