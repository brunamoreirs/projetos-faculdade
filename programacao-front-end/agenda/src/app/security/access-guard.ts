import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const accessGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogged()) {
    return true;
  }

  const returnUrl = state?.url ?? '/contato/list';
  auth.setRedirectUrl(returnUrl);
  router.navigateByUrl(`/login`);
  return false;
};
