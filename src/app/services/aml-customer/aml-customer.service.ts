import { Injectable } from '@angular/core';
import { AmlCustomer, FuzzySearchResult, PersonDecision, PersonDecisionRequest, PersonMatch } from '../../models/aml-customer.model';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/shared';

@Injectable({
  providedIn: 'root'
})
export class AmlCustomerService {
  private endpoint: string = '';
  constructor(private apiService: ApiService) {



  }


  saveDraft(customer: AmlCustomer): Observable<ApiResponse<any>> {

    return this.apiService.post(this.endpoint, customer)
    //  return this.http.post<AmlCustomer>('/api/aml/customers/draft', customer);
  }



  finalize(customer: AmlCustomer): Observable<ApiResponse<any>> {

    return this.apiService.post(this.endpoint, customer)

  }

  search(payload: any): Observable<ApiResponse<FuzzySearchResult>> {
    return this.apiService.post<ApiResponse<FuzzySearchResult>>('sanctions/fuzzy-search/', payload)

  }

  createNewCustomer(payload: any): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>('customers/create-step1/', payload)

  }


  /** Create a new decision */
  createPersonDecision(
    personDecisionRequest: PersonDecisionRequest
  ): Observable<ApiResponse<PersonDecision>> {

    return this.apiService.post<ApiResponse<PersonDecision>>('sanctions/person-decisions/', personDecisionRequest);
  }

 
}
