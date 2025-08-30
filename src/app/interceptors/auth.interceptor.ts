// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('access_token');
    let authReq = req;
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const auth = inject(AuthService);
    if (token) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(authReq).pipe(
        catchError((error) => {
            console.log(error);
            
            if (error.status === 401) {
                toastr.error('Your session has expired. Please log in again.', 'Unauthorized');
                auth.logout();
            }
             
            return throwError(() => error);
        })
    );
};
