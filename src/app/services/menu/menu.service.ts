import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { MenuItem } from '../../models/permission';
import { ApiResponse } from '../../models/shared';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly endpoint = 'menus/';
  constructor(private apiService: ApiService) { }

  getMenus(): Observable<ApiResponse<MenuItem[]>> {
    return this.apiService.get<ApiResponse<MenuItem[]>>(this.endpoint);
  }

}
