import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  // todo: token is temporary. Need to fix this due to issue with isLoggedIn
  // When already logged out, authService.isLoggedIn() is returning true still.
  if (authService.isLoggedIn() && token) {
    console.log("logged in");
    return true;
  } else {
    router.navigate(['/login']);
    console.log("Logout");
    return false;
  }
};
