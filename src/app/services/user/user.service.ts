// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { ApiService } from '../api.service';
// import { User } from '../../models/user';
// import { ApiResponse } from '../../models/shared';
// import { HttpParams } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private endpoint = 'users';

//   constructor(private api: ApiService) { }

//   getUsers(page: number, pageSize: number, search: string): Observable<ApiResponse<User[]>> {

//     const params = new HttpParams()
//       .set('page', page)
//       .set('pageSize', pageSize)
//       .set('search', search);
//     return this.api.get<ApiResponse<User[]>>(this.endpoint, params);



//   }

//   addUser(user: User): Observable<User> {
//     return this.api.post<User>(this.endpoint, user);
//   }

//   updateUser(user: User): Observable<User> {
//     return this.api.put<User>(`${this.endpoint}/${user.id}`, user);
//   }

//   deleteUser(id: number): Observable<void> {
//     return this.api.delete<void>(`${this.endpoint}/${id}`);
//   }
// }
