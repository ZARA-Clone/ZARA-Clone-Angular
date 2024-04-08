import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import { DecodingService } from '../Services/decoding.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let decodingService = inject(DecodingService)
  let router = inject(Router);

  const token = localStorage.getItem('token');
  let roles = decodingService.getRoleFromToken(token)
  if (roles[1] === 'Admin') {
    return true;
  } {
    router.navigate(['/home']);
    return false;
  }

};
// let router = inject(Router);
//   let userService = inject(UserService);
//   if (!userService.getCurrentValue()) {
//     return true
//   } else {
//     router.navigate(['/profile']);
//     return false;
//   }