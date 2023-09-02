import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

import { UserDTO } from '../../shared/models/userDTO';
import { LoginOutput } from '../interfaces/login-output.interface';
import { TokenService } from './token.service';
import { emitirMensagem } from 'src/app/shared/utils/emitirMensagem';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private messageService: MessageService) { }

  login(user: UserDTO) {
    return this.http.post<LoginOutput>(`${environment.API_OASIS}/login`, user).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token);
        if (!res.usuario.codigo || !res.usuario.cpf) {
          this.router.navigateByUrl('autocadastro',
            {
              state: {
                data: {
                  titulo: 'Autocadastro',
                  login: res.usuario.login,
                  codigoDominio: res.usuario.codigoDominio
                }
              }
            });

        } else {
          this.router.navigate(['/']);
        }
      },
      error: (erro) => {
        //emitirMensagem(this.messageService, 'error', `!`);
      }
    });
  }


  obterNovoTokenPorCpf(cpf: string, login: string): Observable<any> {
    return this.http.get<any>(`${environment.API_OASIS}/login/obter-novo-token/${cpf}/${login}`).pipe(take(1));
  }

  obterDadosUsuarioAD(login: string, codigoDominio: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.API_OASIS}/login/usuario-ad-autocadastro/${login}/${codigoDominio}`)
  }



}
