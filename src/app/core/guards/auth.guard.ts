import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const user = await authService.getCurrentUser();
    const session = await authService.getCurrentSession();
    
    if (user && session) {
      return true;
    }
    
    router.navigate(['/auth']);
    return false;
  } catch (error) {
    router.navigate(['/auth']);
    return false;
  }
}; 