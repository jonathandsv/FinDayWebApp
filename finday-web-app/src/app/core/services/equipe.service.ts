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
export class EquipeService extends BaseService {

    entidade = "equipe";
    url = `${environment.API_OASIS}/${this.entidade}`;

    constructor(protected http: HttpClient, protected router: Router) {
        super(http, router, "equipe");
    }

    autoCompleteListarTodos(param: any) : Observable<Equipe[]> {
        return this.http.get<Equipe[]>(`${this.url}/autocomplete/${param}`,);
    }
}    