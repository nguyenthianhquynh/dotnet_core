import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/auth.service';

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
    const authService = inject(AuthService);
    const router = inject(Router);


    const token = localStorage.getItem('token') ?? ""
    authService.getCurrentUser(token).pipe().subscribe();

    return authService.user$.pipe(
        map(user => {
            if (!user) {
                router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;
            } else {
                return true;
            }
        })
    );
}