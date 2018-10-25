import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private _userService: UserService,
        private _router: Router
    ) {

    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const identity = this._userService.getIdentity();
        if (identity && (identity.role === 'ROLE_ADMIN')) {
            return true;
        } else {
            this._router.navigate(['/']);
            return false;
        }
    }
}
