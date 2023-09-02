import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Equipe } from "../interfaces/equipe.interface";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class ItemCheckList extends BaseService {

    entidade = "itemCheckList";
    url = `${environment.API_OASIS}/${this.entidade}`;

    constructor(protected http: HttpClient, protected router: Router) {
        super(http, router, "itemCheckList");
    }

    obterListaItemsCheckListPorTipo(tipoItem: any) : Observable<any> {
        return this.http.get<any>(`${this.url}/${tipoItem}`,);
    }
}    