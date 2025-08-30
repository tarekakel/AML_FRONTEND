import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CurrentUserInfo, User } from '../../models/user';
import { ApiResponse } from '../../models/shared';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'admin/users/';

  constructor(private api: ApiService) { }

  getUsers(page: number, pageSize: number, search: string): Observable<ApiResponse<User[]>> {

    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('search', search);
    return this.api.get<ApiResponse<User[]>>(this.endpoint, params);

  }

  addUser(user: User): Observable<ApiResponse<User>> {
    return this.api.post<ApiResponse<User>>(this.endpoint, user);
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    return this.api.put<ApiResponse<User>>(`${this.endpoint}${user.id}/`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }

  getCurrentUser(): Observable<ApiResponse<CurrentUserInfo>> {
    return this.api.get<ApiResponse<CurrentUserInfo>>(`${this.endpoint}user-info/`);
  }
}
