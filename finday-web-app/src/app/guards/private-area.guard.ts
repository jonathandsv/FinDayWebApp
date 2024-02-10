import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const privateAreaGuard = () => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return validateGuardToken();

  function validateGuardToken() {
    const tokenExpired = tokenService.tokenExpired();
    const usuario = tokenService.decryptToken();
    debugger
    if (tokenExpired) {
      router.navigate(['/login']);
    }
    
    return !tokenExpired;
  }
}