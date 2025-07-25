// src/app/auth/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/shared';

interface LoginPayload { username: string; password: string; }
interface RegisterPayload { username: string; email: string; password: string; }
interface TokenPair { access: string; refresh: string; }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  login(payload: LoginPayload): Observable<ApiResponse<TokenPair>> {
    return this.http.post<ApiResponse<TokenPair>>(`${this.apiUrl}/login/`, payload)
      .pipe(
        tap(res => {
          if (res.isSuccess && res.data) {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
          }
        })
      );
  }


  register(payload: RegisterPayload): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/register/`, payload);
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/login']);
  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('access');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  refreshToken(): Observable<ApiResponse<{ access: string }>> {
    const refresh = localStorage.getItem('refresh_token')!;
    return this.http.post<ApiResponse<{ access: string }>>(`${this.apiUrl}/refresh/`, { refresh })
      .pipe(tap(res => {
        if (res.isSuccess) {
          localStorage.setItem('access_token', res.data.access);
        }
      }));
  }


}
