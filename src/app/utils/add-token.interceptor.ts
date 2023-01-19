import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login'])
          this.messageError(error);
        }
        return throwError(() => new Error('Error'))
      })
    )
  }

  messageError(e: HttpErrorResponse) {
    this._snackBar.open(`Accès non autorisé, veuillez vous connecter pour continuer`, '', {
      duration: 4000,
      verticalPosition: 'top',
      panelClass: ['warning']
    })
  }
}
