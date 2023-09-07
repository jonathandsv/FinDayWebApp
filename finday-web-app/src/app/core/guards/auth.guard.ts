import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
export const authGuard = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return validateGuardToken();

  function validateGuardToken() {
    const tokenExpired = tokenService.tokenExpired();
    const usuario = tokenService.decryptToken();
    if (tokenExpired || usuario.codigo == 0 || !usuario.cpf) {
      router.navigate(['/login']);
    }
    
    return !tokenExpired;
  }
}
