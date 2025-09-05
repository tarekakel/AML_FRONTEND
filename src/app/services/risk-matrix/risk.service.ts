import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ApiResponse } from '../../models/shared';
import { RiskFactorGroup } from '../../models/risk.model';
import { RiskDataType } from '../../models/sanction-list.model';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  private readonly endpoint = 'risk/'
  constructor(private apiService: ApiService) { }

  // Risk Factor Groups (Categories)
  getGroups(): Observable<ApiResponse<RiskFactorGroup[]>> {
    return this.apiService.get<ApiResponse<RiskFactorGroup[]>>(`${this.endpoint}risk-groups/`);
  }
  getDataTypes(): Observable<ApiResponse<RiskDataType[]>> {
    return this.apiService.get<ApiResponse<RiskDataType[]>>(`${this.endpoint}datatypes/`);
  }
  // Create new category
  create(category: RiskFactorGroup): Observable<ApiResponse<RiskFactorGroup>> {
    return this.apiService.post<ApiResponse<RiskFactorGroup>>(`${this.endpoint}risk-groups/`, category);
  }

  update(category: RiskFactorGroup): Observable<ApiResponse<RiskFactorGroup>> {
    return this.apiService.put<ApiResponse<RiskFactorGroup>>(`${this.endpoint}risk-groups/${category.id}/`, category);
  }
  // addGroup(group: RiskFactorGroup): Observable<RiskFactorGroup> {
  //   return this.http.post<RiskFactorGroup>(`${this.baseUrl}/risk-groups/`, group);
  // }

  // updateGroup(id: number, group: RiskFactorGroup): Observable<RiskFactorGroup> {
  //   return this.http.put<RiskFactorGroup>(`${this.baseUrl}/risk-groups/${id}/`, group);
  // }

  // // Risk Factors (Sub-Categories)
  // addFactor(factor: RiskFactor): Observable<RiskFactor> {
  //   return this.http.post<RiskFactor>(`${this.baseUrl}/risk-factors/`, factor);
  // }

  // updateFactor(id: number, factor: RiskFactor): Observable<RiskFactor> {
  //   return this.http.put<RiskFactor>(`${this.baseUrl}/risk-factors/${id}/`, factor);
  // }


}
