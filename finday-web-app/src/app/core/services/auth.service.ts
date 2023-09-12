import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { UserDTO } from '../../shared/models/userDTO';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router,
    private tokenService: TokenService) { }

  login(user: UserDTO) {
    return this.http.post<any>(`${environment.API_FINDAY}/Account/login`, user).subscribe({
      next: (res) => {
        debugger
        this.tokenService.setToken(res.data.accessToken);
        this.router.navigate(['/']);
      },
      error: (erro) => {
        //emitirMensagem(this.messageService, 'error', `!`);
      }
    });
  }
}