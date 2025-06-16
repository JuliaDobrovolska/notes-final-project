import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from '../services/auth.service';

export const canActivateAuthGuard = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  if (authService.userSubject.value) {
    return true;
  }
  console.log('canActivateAuthGuard')
  router.navigate(['/auth'])

  return false;
}
