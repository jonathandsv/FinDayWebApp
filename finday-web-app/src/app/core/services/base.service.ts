import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class BaseService {
  constructor(
    protected http: HttpClient,
    protected router: Router
  ) { }

}