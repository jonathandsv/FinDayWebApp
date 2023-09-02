import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends BaseService{
  url = `${environment.API_OASIS}/tipoDocumento`;

  constructor(protected http: HttpClient, protected router: Router) {
    super(http, router, 'tipoDocumento');
  }

  
}
