import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../../models/shared';
import { DashboardData } from '../../models/dashboard.model';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})


export class DashboardService {

  private endpoint = 'dashboard-data/';

  constructor(private apiService: ApiService) { }

  getDashboardData(
    codes: string[],
    filters?: { start_date?: string; end_date?: string; audit_id?: number }
  ): Observable<ApiResponse<DashboardData[]>> {
    const body = {
      codes,
      ...filters,
    };

    return this.apiService.post<ApiResponse<DashboardData[]>>(this.endpoint, body);
  }


}
