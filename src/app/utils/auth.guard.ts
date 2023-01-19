import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _snackBar: MatSnackBar) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    if (token == undefined) {
      this.messageError();
      this.router.navigate(['/login']);
    }
    return true;
  }

  messageError() {
    this._snackBar.open(`Accès interdit, veuillez vous connecter pour continuer`, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['warning']
    })
  }



}
