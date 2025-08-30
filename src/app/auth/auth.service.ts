// src/app/auth/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/shared';
import { UserService } from '../services/user/user.service';
import { CurrentUserInfo } from '../models/user';

interface LoginPayload { username: string; password: string; }
interface RegisterPayload { username: string; email: string; password: string; }
interface TokenPair { access: string; refresh: string; }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  public currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();



  constructor(private http: HttpClient, private router: Router, private profileSvc: UserService,) {


  }

  login(payload: LoginPayload): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<TokenPair>>(`${this.apiUrl}/login/`, payload)
      .pipe(
        tap(res => {
          if (res.isSuccess && res.data) {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
          }
        }),
        // 2. Fetch profile and seed BehaviorSubject
        switchMap(() => this.profileSvc.getCurrentUser()),
        tap((user) => this.currentUserSubject.next(user))

      );
  }


  register(payload: RegisterPayload): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/register/`, payload);
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/login']);
    this.currentUserSubject.next(null);

  }



  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
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


  requestPasswordReset(email: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/password-reset/`, { email });
  }

  confirmPasswordReset(data: {
    uid: string;
    token: string;
    password: string;
  }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/password-reset/confirm/`, data);
  }



}
